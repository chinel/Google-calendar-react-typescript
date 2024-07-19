import { useMemo, useState } from "react";
import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  subMonths,
  addMonths,
  isSameDay,
} from "date-fns";
import CalendarDay from "./CalendarDay";
import { formatDate } from "../utils/formatDate";
import useEvents from "../hooks/useEvents";

export default function Calendar() {
  const [selectedMonth, setSelectedMonth] = useState(new Date());

  const calendarDays = useMemo(() => {
    //StartofMonth will give us start of the month for example July 1st 2024
    //Startofweek will give us the sunday at the begining of the week (Sun 30th - 1st July)
    const firstWeekStart = startOfWeek(startOfMonth(selectedMonth));
    const lastWeekEnd = endOfWeek(endOfMonth(selectedMonth));
    return eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd });
  }, [selectedMonth]);

  const { events } = useEvents();

  return (
    <div className="calendar">
      <div className="header">
        <button className="btn" onClick={() => setSelectedMonth(new Date())}>
          Today
        </button>
        <div>
          <button
            className="month-change-btn"
            onClick={() => {
              setSelectedMonth((prevMonth) => subMonths(prevMonth, 1));
            }}
          >
            &lt;
          </button>
          <button
            className="month-change-btn"
            onClick={() => {
              setSelectedMonth((prevMonth) => addMonths(prevMonth, 1));
            }}
          >
            &gt;
          </button>
        </div>
        <span className="month-title">
          {formatDate(selectedMonth, {
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
      <div className="days">
        {calendarDays.map((day, index) => (
          <CalendarDay
            day={day}
            showWeekName={index < 7}
            key={day.getTime()}
            selectedMonth={selectedMonth}
            events={events.filter((event) => isSameDay(day, event.date))}
          />
        ))}
      </div>
    </div>
  );
}
