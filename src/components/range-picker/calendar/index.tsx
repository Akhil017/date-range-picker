import { WEEKDAYS } from "@/utils/constants";
import { getMonthAndYear } from "@/utils/helpers";
import { Icons } from "../../icons";
import CalendarDays from "./calendar-days";
import "./calendar.scss";
import { useCallback, useState } from "react";
import YearMonthSelector from "../year-month-selector";

type CalendarProps = {
  type: "left" | "right";
  currentDate: Date;
  handleNextBtnClick: () => void;
  handlePrevBtnClick: () => void;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
};

export default function Calendar({
  currentDate,
  handleNextBtnClick,
  handlePrevBtnClick,
  setCurrentDate,
}: CalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const monthAndYear = getMonthAndYear(currentDate);

  const handleMonthSelection = useCallback(
    (index: number) => {
      setCurrentDate(
        new Date(currentDate.getFullYear(), index, currentDate.getDate())
      );
      setIsOpen(false);
    },
    [currentDate]
  );

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
            <YearMonthSelector
              handleMonthSelection={handleMonthSelection}
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              setIsOpen={setIsOpen}
            />
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
