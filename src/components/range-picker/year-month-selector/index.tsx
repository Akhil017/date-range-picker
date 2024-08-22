import { MONTHS } from "@/utils/constants";
import "./year-month-selector.scss";
import { Icons } from "@/components/icons";
import { getNextYear, getPreviousYear } from "@/utils/helpers";

type YearMonthSelectorProps = {
  currentDate: Date;
  setCurrentDate: React.Dispatch<React.SetStateAction<Date>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleMonthSelection: (month: number) => void;
};

export default function YearMonthSelector({
  currentDate,
  setCurrentDate,
  handleMonthSelection,
}: YearMonthSelectorProps) {
  const currentYear = currentDate.getFullYear();

  const handleNextYearBtn = () => {
    setCurrentDate(getNextYear(currentDate));
  };

  const handlePrevYearBtn = () => {
    setCurrentDate(getPreviousYear(currentDate));
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
