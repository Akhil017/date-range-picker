import { WEEKDAYS } from "@/utils/constants";
import { getCurrentDay, getMonthAndYear } from "@/utils/helpers";
import { useState } from "react";
import { Icons } from "../../icons";
import { useRangePickerContext } from "../range-picker-context";
import CalendarDays from "./calendar-days";
import "./calendar.scss";

type CalendarProps = {
  index: 0 | 1;
};

export default function Calendar({ index }: CalendarProps) {
  const { defaultDay, selectedRange } = useRangePickerContext();

  const processedCurrentDay =
    (index === 0
      ? getCurrentDay(selectedRange?.from)
      : getCurrentDay(selectedRange?.to)) || getCurrentDay(defaultDay, index);

  const [currentDay, setCurrentDay] = useState(processedCurrentDay!);

  console.log({ currentDay });

  const handlePrevBtnClick = () => {
    setCurrentDay(
      new Date(
        currentDay.getFullYear(),
        currentDay.getMonth() - 1,
        currentDay.getDate()
      )
    );
  };

  const handleNextBtnClick = () => {
    setCurrentDay(
      new Date(
        currentDay.getFullYear(),
        currentDay.getMonth() + 1,
        currentDay.getDate()
      )
    );
  };

  const monthAndYear = getMonthAndYear(currentDay);

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
