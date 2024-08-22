import { MONTHS } from "@/utils/constants";
import "./year-month-selector.scss";
import { Icons } from "@/components/icons";
import {
  getDifferenceInMonth,
  getNextMonth,
  getNextYear,
  getPreviousMonth,
  getPreviousYear,
} from "@/utils/helpers";
import { useRangePickerContext } from "../range-picker-context";

type YearMonthSelectorProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: "left" | "right";
};

export default function YearMonthSelector({
  setIsOpen,
  type,
}: YearMonthSelectorProps) {
  const {
    leftCalendarDate,
    rightCalendarDate,
    setLeftCalendarDate,
    setRightCalendarDate,
  } = useRangePickerContext();

  // choose the date according to the type
  const currentDate = type === "left" ? leftCalendarDate : rightCalendarDate;

  const currentYear = currentDate.getFullYear();

  const handleNextYearBtn = () => {
    if (type === "left") {
      setLeftCalendarDate(getNextYear(currentDate));
    } else {
      setRightCalendarDate(getNextYear(currentDate));
    }
  };

  const handlePrevYearBtn = () => {
    if (type === "left") {
      setLeftCalendarDate(getPreviousYear(currentDate));
    } else {
      setRightCalendarDate(getPreviousYear(currentDate));
    }
  };

  const handleMonthSelection = (index: number) => {
    //if type left check the diff and set the right
    const updatedDate = new Date(
      currentDate.getFullYear(),
      index,
      currentDate.getDate()
    );

    if (type === "left") {
      setLeftCalendarDate(updatedDate);
      const monthDiff = getDifferenceInMonth(updatedDate, rightCalendarDate);
      // making sure that bothe left and right calendar have atleast 1 month diff
      if (monthDiff < 1) {
        setRightCalendarDate(getNextMonth(updatedDate));
      }
    } else {
      setRightCalendarDate(updatedDate);
      const monthDiff = getDifferenceInMonth(
        leftCalendarDate,
        rightCalendarDate
      );
      // making sure that bothe left and right calendar have atleast 1 month diff
      if (monthDiff < 1) {
        setLeftCalendarDate(getPreviousMonth(updatedDate));
      }
    }
    setIsOpen(false);
  };

  return (
    <div className="year-month-selector">
      <div className="year-month-selector-header">
        <button onClick={handlePrevYearBtn}>
          <Icons.prev />
        </button>
        <p>{currentYear}</p>
        <button onClick={handleNextYearBtn}>
          <Icons.next />
        </button>
      </div>
      <div className="year-month-selector-body">
        {MONTHS.map((month, index) => (
          <div
            className="month"
            key={index}
            onClick={() => handleMonthSelection(index)}
          >
            {month}
          </div>
        ))}
      </div>
    </div>
  );
}
