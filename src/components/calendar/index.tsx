import "./calendar.scss";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
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
  return (
    <div className="calendar">
      <div className="calendar-header">Aug 2024</div>
      <div className="calendar-body">
        <div className="calendar-table-header">
          {WEEKDAYS.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="calendar-table-body"></div>
      </div>
    </div>
  );
}
