import "./calendar-days.scss";

type CalendarDaysProps = {
  currentDay: Date;
};

export default function CalendarDays({ currentDay }: CalendarDaysProps) {
  // get the first day of the month
  const firstDateOfTheMonth = new Date(
    currentDay.getFullYear(),
    currentDay.getMonth(),
    1
  );
  const firstDayOfTheMonth = firstDateOfTheMonth.getDay();
  console.log({ firstDayOfTheMonth });

  const calendarDays = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && firstDayOfTheMonth === 0) {
      firstDateOfTheMonth.setDate(firstDateOfTheMonth.getDate());
    } else if (day === 0) {
      firstDateOfTheMonth.setDate(
        firstDateOfTheMonth.getDate() - firstDayOfTheMonth
      );
    } else {
      firstDateOfTheMonth.setDate(firstDateOfTheMonth.getDate() + 1);
    }

    calendarDays.push({
      id: firstDateOfTheMonth.toDateString(),
      isCurrentMonth: firstDateOfTheMonth.getMonth() === currentDay.getMonth(),
      isSelected:
        firstDateOfTheMonth.toDateString() === currentDay.toDateString(),
      date: new Date(firstDateOfTheMonth),
      isWeekend:
        firstDateOfTheMonth.getDay() === 0 ||
        firstDateOfTheMonth.getDay() === 6,

      label: firstDateOfTheMonth.getDate(),
    });
  }

  return (
    <div className="calendar-days">
      {calendarDays.map(({ id, isSelected, label, isCurrentMonth }) => (
        <div
          key={id}
          className={`calendar-day ${isSelected && "calendar-day-selected"} ${
            isCurrentMonth && "calendar-day-current-month"
          }`}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
