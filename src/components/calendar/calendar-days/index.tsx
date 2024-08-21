import "./calendar-days.scss";

export default function CalendarDays() {
  return (
    <div className="calendar-days">
      {[...Array(42).keys()].map((i) => (
        <div className="calendar-day">{i}</div>
      ))}
    </div>
  );
}
