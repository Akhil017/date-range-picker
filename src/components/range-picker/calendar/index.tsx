import { WEEKDAYS } from "@/utils/constants";
import {
  getDifferenceInMonth,
  getMonthAndYear,
  getNextMonth,
  getPreviousMonth,
} from "@/utils/helpers";
import { Icons } from "../../icons";
import CalendarDays from "./calendar-days";
import "./calendar.scss";
import { useState } from "react";
import YearMonthSelector from "../year-month-selector";
import { useRangePickerContext } from "../range-picker-context";

type CalendarProps = {
  type: "left" | "right";
};

export default function Calendar({ type }: CalendarProps) {
  const {
    leftCalendarDate,
    setLeftCalendarDate,
    rightCalendarDate,
    setRightCalendarDate,
  } = useRangePickerContext();

  const currentDate = type === "left" ? leftCalendarDate : rightCalendarDate;

  const [isOpen, setIsOpen] = useState(false);
  const monthAndYear = getMonthAndYear(currentDate);

  const handlePrevBtnClick = () => {
    if (type === "left") {
      setLeftCalendarDate(getPreviousMonth(leftCalendarDate));
    } else {
      setRightCalendarDate(getPreviousMonth(rightCalendarDate));
      const monthDiff = getDifferenceInMonth(
        leftCalendarDate,
        rightCalendarDate
      );
      // making sure that left and right calendar have 1 month difference
      if (monthDiff === 1) {
        setLeftCalendarDate(getPreviousMonth(leftCalendarDate));
      }
    }
  };

  const handleNextBtnClick = () => {
    if (type === "right") {
      setRightCalendarDate(getNextMonth(rightCalendarDate));
    } else {
      setLeftCalendarDate(getNextMonth(leftCalendarDate));
      //check if the difference is 1 if not change right calendar as well
      const monthDiff = getDifferenceInMonth(
        leftCalendarDate,
        rightCalendarDate
      );
      // making sure that left and right calendar have 1 month difference
      if (monthDiff === 1) {
        setRightCalendarDate(getNextMonth(rightCalendarDate));
      }
    }
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button className="calendar-month-btn" onClick={handlePrevBtnClick}>
          <Icons.prev />
        </button>
        <p
          onClick={() => setIsOpen((prev) => !prev)}
          className="calendar-month-year"
        >
          {monthAndYear}
        </p>

        {isOpen && (
          <div className="calendar-year-month-selector">
            <YearMonthSelector type={type} setIsOpen={setIsOpen} />
          </div>
        )}

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
          <CalendarDays currentDay={currentDate} />
        </div>
      </div>
    </div>
  );
}
