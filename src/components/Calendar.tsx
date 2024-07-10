import { useMemo, useState } from "react";
import {
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
} from "date-fns";
import CalendarDay from "./CalendarDay";

export default function Calendar() {
  const [selectedMonth] = useState(new Date());

  const calendarDays = useMemo(() => {
    //StartofMonth will give us start of the month for example July 1st 2024
    //Startofweek will give us the sunday at the begining of the week (Sun 30th - 1st July)
    const firstWeekStart = startOfWeek(startOfMonth(selectedMonth));
    const lastWeekEnd = endOfWeek(endOfMonth(selectedMonth));
    return eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd });
  }, [selectedMonth]);

  return (
    <div className="calendar">
      <div className="header">
        <button className="btn">Today</button>
        <div>
          <button className="month-change-btn">&lt;</button>
          <button className="month-change-btn">&gt;</button>
        </div>
        <span className="month-title">June 2023</span>
      </div>
      <div className="days">
        {calendarDays.map((day, index) => (
          <CalendarDay
            day={day}
            showWeekName={index < 7}
            key={day.getTime()}
            selectedMonth={selectedMonth}
          />
        ))}
      </div>
    </div>
  );
}
