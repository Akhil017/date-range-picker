import { useRangePickerContext } from "../../range-picker-context";
import "./calendar-days.scss";

type CalendarDaysProps = {
  currentDay: Date;
};

type Day = {
  id: string;
  isCurrentMonth: boolean;
  isSelected: boolean;
  date: Date;
  isWeekend: boolean;
  label: number;
  isFrom: boolean;
  isTo: boolean;
  inRange: boolean;
};

export default function CalendarDays({ currentDay }: CalendarDaysProps) {
  const { defaultDay, selectedRange, setSelectedRange } =
    useRangePickerContext();
  // get the first day of the month
  const firstDateOfTheMonth = new Date(
    currentDay.getFullYear(),
    currentDay.getMonth(),
    1
  );
  const firstDayOfTheMonth = firstDateOfTheMonth.getDay();

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
        firstDateOfTheMonth.toDateString() === defaultDay.toDateString(),
      date: new Date(firstDateOfTheMonth),
      isWeekend:
        firstDateOfTheMonth.getDay() === 0 ||
        firstDateOfTheMonth.getDay() === 6,

      label: firstDateOfTheMonth.getDate(),
      isFrom:
        firstDateOfTheMonth.toDateString() ===
        selectedRange?.from?.toDateString(),
      isTo:
        firstDateOfTheMonth.toDateString() ===
        selectedRange?.to?.toDateString(),
      inRange:
        (selectedRange?.from &&
          firstDateOfTheMonth > selectedRange?.from &&
          selectedRange?.to &&
          firstDateOfTheMonth < selectedRange?.to) ||
        false,
    });
  }

  const handleRangeSelection = (day: Day) => {
    // if weekend dont select
    if (day.isWeekend) return;

    // if range is already selected new selection will ignore the previous selection and new from will be set
    if (selectedRange?.from && selectedRange?.to) {
      setSelectedRange({ from: day.date, to: null });
      return;
    }

    // if from is not being set then set from
    if (selectedRange?.from === null) {
      setSelectedRange((prev) => ({
        ...prev,
        from: day.date,
      }));
    } else {
      // if the selected date is greater than from then set it as to
      if (selectedRange?.from < day.date) {
        setSelectedRange((prev) => ({
          ...prev,
          to: day.date,
        }));
      } else {
        // if from greater and to already exist
        // then from = selected date
        // to = from

        setSelectedRange((prev) => ({
          to: prev.from,
          from: day.date,
        }));
      }
    }
  };

  return (
    <div className="calendar-days">
      {calendarDays.map((day) => (
        <div
          key={day.id}
          className={`calendar-day ${
            day.isSelected && day.isCurrentMonth ? "calendar-day-selected" : ""
          } ${day.isCurrentMonth ? "calendar-day-current-month" : ""} ${
            day.isFrom && day.isCurrentMonth ? "calendar-day-from" : ""
          } ${day.isTo && day.isCurrentMonth ? "calendar-day-to" : ""} ${
            day.inRange &&
            !day.isWeekend &&
            day.isCurrentMonth &&
            !day.isFrom &&
            !day.isTo
              ? "calendar-day-inrange"
              : ""
          }`}
          onClick={() => {
            handleRangeSelection(day);
          }}
        >
          {day.label}
        </div>
      ))}
    </div>
  );
}
