import { WEEKDAYS } from "@/utils/constants";
import { getMonthAndYear } from "@/utils/helpers";
import { Icons } from "../../icons";
import CalendarDays from "./calendar-days";
import "./calendar.scss";

type CalendarProps = {
  currenDate: Date;
  handleNextBtnClick: () => void;
  handlePrevBtnClick: () => void;
};

export default function Calendar({
  currenDate,
  handleNextBtnClick,
  handlePrevBtnClick,
}: CalendarProps) {
  console.log({ currenDate });

  const monthAndYear = getMonthAndYear(currenDate);

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
          <CalendarDays currentDay={currenDate} />
        </div>
      </div>
    </div>
  );
}
