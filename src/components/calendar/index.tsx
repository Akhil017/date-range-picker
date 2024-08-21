import { useState } from "react";
import CalendarDays from "./calendar-days";
import "./calendar.scss";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Calendar() {
  const [currentDay] = useState(new Date());

  return (
    <div className="calendar">
      <div className="calendar-header">Aug 2024</div>
      <div className="calendar-body">
        <div className="calendar-table-header">
          {WEEKDAYS.map((day) => (
            <div key={day} className="calendar-weekday">
              {day}
            </div>
          ))}
        </div>
        <div className="calendar-table-body">
          <CalendarDays currentDay={currentDay} />
        </div>
      </div>
    </div>
  );
}
