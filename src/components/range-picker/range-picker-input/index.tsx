import * as React from "react";

import { Icons } from "@/components/icons";
import "./range-picker-input.scss";
// import { getFormattedDate } from "@/utils/helpers";
import { useRangePickerContext } from "../range-picker-context";
import { DEFAULTFORMAT } from "@/utils/constants";
import { getNextMonth } from "@/utils/helpers";
// import { DEFAULTFORMAT } from "@/utils/constants";

type DateRangeInputProps = {
  onClick: () => void;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

const DateRangeInput = ({ onClick, value, setValue }: DateRangeInputProps) => {
  const {
    selectedRange,
    setSelectedRange,
    setLeftCalendarDate,
    setRightCalendarDate,
  } = useRangePickerContext();

  // const formattedFromDate = getFormattedDate(selectedRange?.from);
  // const formattedToDate = getFormattedDate(selectedRange?.to);

  // const processed = `${formattedFromDate || DEFAULTFORMAT} - ${
  //   formattedToDate || DEFAULTFORMAT
  // }`;

  const showClose = selectedRange.from && selectedRange.to;

  const handleClearInput = (e: React.MouseEvent<HTMLElement>) => {
    setSelectedRange({ from: null, to: null });
    setValue(`${DEFAULTFORMAT} ~ ${DEFAULTFORMAT}`);
    setLeftCalendarDate(new Date());
    setRightCalendarDate(getNextMonth(new Date()));
    e.stopPropagation();
  };

  return (
    <div className="range-picker-input" onClick={onClick}>
      <input value={value} />
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
};

export default DateRangeInput;
