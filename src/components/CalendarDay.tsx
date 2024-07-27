import { endOfDay, isBefore, isSameMonth, isToday } from "date-fns";
import { formatDate } from "../utils/formatDate";
import { cc } from "../utils/joinClasses";
import useEvents from "../hooks/useEvents";
import { useMemo, useState } from "react";
import EventFormModal from "./EventFormModal";
import { Event } from "../context/Events";
import CalendarEvent from "./CalendarEvent";
import { OverflowContainer } from "./OverflowContainer";
import ViewMoreCalendarEventsModal from "./ViewMoreCalendarEventsModal";

type CalendarDayProps = {
  day: Date;
  showWeekName: boolean;
  selectedMonth: Date;
  events: Event[];
};

export default function CalendarDay({
  day,
  showWeekName,
  selectedMonth,
  events,
}: CalendarDayProps) {
  const [isNewEventModalOpen, setIsNewEventModalOpen] = useState(false);
  const [isViewMoreEventModalOpen, setIsViewMoreEventModalOpen] =
    useState(false);
  const { addEvent } = useEvents();

  const sortedEvents = useMemo(() => {
    const timeToNumber = (time: string) => parseInt(time.replace(":", "."));

    return [...events].sort((a, b) => {
      if (a.allDay && b.allDay) {
        return 0;
      } else if (a.allDay) {
        return -1;
      } else if (b.allDay) {
        return 1;
      } else {
        return timeToNumber(a.startTime) - timeToNumber(b.startTime);
      }
    });
  }, [events]);

  return (
    <div
      className={cc(
        "day",
        !isSameMonth(day, selectedMonth) && "non-month-day",
        isBefore(endOfDay(day), new Date()) && "old-month-day"
      )}
    >
      <div className="day-header">
        {showWeekName && (
          <div className="week-name">
            {formatDate(day, { weekday: "short" })}
          </div>
        )}
        <div className={cc("day-number", isToday(day) && "today")}>
          {formatDate(day, { day: "numeric" })}
        </div>
        <button
          className="add-event-btn"
          onClick={() => setIsNewEventModalOpen(true)}
        >
          +
        </button>
      </div>
      {sortedEvents.length > 0 && (
        <OverflowContainer
          className="events"
          items={sortedEvents}
          getKey={(event) => event.id}
          renderItem={(event) => <CalendarEvent key={event.id} event={event} />}
          renderOverflow={(amount) => (
            <>
              <button
                onClick={() => setIsViewMoreEventModalOpen(true)}
                className="events-view-more-btn"
              >
                +{amount} More
              </button>
              <ViewMoreCalendarEventsModal
                events={sortedEvents}
                isOpen={isViewMoreEventModalOpen}
                onClose={() => setIsViewMoreEventModalOpen(false)}
              />
            </>
          )}
        />
      )}
      <EventFormModal
        isOpen={isNewEventModalOpen}
        onClose={() => setIsNewEventModalOpen(false)}
        onSubmit={addEvent}
        date={day}
      />
    </div>
  );
}
