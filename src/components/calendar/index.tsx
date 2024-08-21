import { useState } from "react";
import CalendarDays from "./calendar-days";
import "./calendar.scss";
import { Icons } from "../icons";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function Calendar() {
  const [currentDay, setCurrentDay] = useState(new Date());

  console.log({ currentDay });

  const handlePrevBtnClick = () => {
    console.log({ currentDay_prev: currentDay });
    console.log({ getDay_prev: currentDay.getDay() });
    setCurrentDay(
      new Date(
        currentDay.getFullYear(),
        currentDay.getMonth() - 1,
        currentDay.getDate()
      )
    );
  };

  const handleNextBtnClick = () => {
    console.log({ currentDay_next: currentDay });
    console.log({ getDay_next: currentDay.getDay() });
    setCurrentDay(
      new Date(
        currentDay.getFullYear(),
        currentDay.getMonth() + 1,
        currentDay.getDate()
      )
    );
  };

  const monthAndYear = `${
    MONTHS[currentDay.getMonth()]
  } ${currentDay.getFullYear()}`;

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="calendar-month-btn" onClick={handlePrevBtnClick}>
          <Icons.prev />
        </button>
        <p>{monthAndYear}</p>
        <button className="calendar-month-btn" onClick={handleNextBtnClick}>
          <Icons.next />
        </button>
      </div>
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
