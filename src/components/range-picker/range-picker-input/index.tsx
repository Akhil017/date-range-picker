import * as React from "react";

import { Icons } from "@/components/icons";
import "./range-picker-input.scss";
import { useRangePickerContext } from "../range-picker-context";
import { DEFAULTFORMAT } from "@/utils/constants";
import { getNextMonth } from "@/utils/helpers";

interface DateRangeInputProps extends React.HTMLAttributes<HTMLDivElement> {
  onClick: () => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

const DateRangeInput = React.forwardRef<HTMLDivElement, DateRangeInputProps>(
  ({ onClick, value, setValue }, ref) => {
    const {
      selectedRange,
      setSelectedRange,
      setLeftCalendarDate,
      setRightCalendarDate,
    } = useRangePickerContext();

    const handleClearInput = (e: React.MouseEvent<HTMLElement>) => {
      setSelectedRange({ from: null, to: null });
      setValue(`${DEFAULTFORMAT} ~ ${DEFAULTFORMAT}`);
      setLeftCalendarDate(new Date());
      setRightCalendarDate(getNextMonth(new Date()));
      e.stopPropagation();
    };

    const showClose = selectedRange.from && selectedRange.to;

    return (
      <div className="range-picker-input" onClick={onClick} ref={ref}>
        <input value={value} readOnly />
        <div>
          {showClose ? (
            <button onClick={handleClearInput}>
              <Icons.close />
            </button>
          ) : (
            <Icons.calendar />
          )}
        </div>
      </div>
    );
  }
);

export default DateRangeInput;
