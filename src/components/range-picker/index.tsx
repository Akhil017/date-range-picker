import { useState } from "react";
import RangePickerInput from "./range-picker-input";
import Calendar from "./calendar";
import "./range-picker.scss";
import {
  RangePickerProvider,
  type SelectedRange,
} from "./range-picker-context";
import {
  getDifferenceInMonth,
  getFormattedDate,
  getNextMonth,
  getPreviousMonth,
  getWeekendsByRange,
} from "@/utils/helpers";
import { DEFAULTFORMAT } from "@/utils/constants";

export type SelectedRangeWithWeekend = [string[], string[]];

export type PredefinedRange = {
  label: string;
  value: [Date, Date];
};

type RangePickerProps = {
  onOk: (selectedRange: SelectedRangeWithWeekend) => void;
  predefinedRange?: PredefinedRange[];
};

export default function RangePicker({
  onOk,
  predefinedRange = [],
}: RangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultDay, setDefaultDay] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<SelectedRange>({
    from: null,
    to: null,
  });

  const [inputValue, setInputValue] = useState(
    `${DEFAULTFORMAT} ~ ${DEFAULTFORMAT}`
  );

  const [leftCalendarDate, setLeftCalendarDate] = useState(new Date());
  const [rightCalendarDate, setRightCalendarDate] = useState(
    getNextMonth(new Date())
  );

  const formattedFromDate = getFormattedDate(selectedRange?.from);
  const formattedToDate = getFormattedDate(selectedRange?.to);

  const handleOnOk = (fromDate: Date | null, toDate: Date | null) => {
    if (fromDate && toDate) {
      const formattedFromDate = getFormattedDate(fromDate);
      const formattedToDate = getFormattedDate(toDate);
      const weekends = getWeekendsByRange(fromDate, toDate);
      onOk([[formattedFromDate, formattedToDate], weekends]);
      setInputValue(`${formattedFromDate} ~ ${formattedToDate}`);
    }

    setIsOpen(false);
  };

  const handlePredefinedRangeClick = (range: PredefinedRange) => {
    if (!range.value) return;
    setSelectedRange({
      from: range.value[0],
      to: range.value[1],
    });
    //check if month diff is greater than 1

    const monthDiff = getDifferenceInMonth(range.value[0], range.value[1]);

    if (monthDiff >= 1) {
      setLeftCalendarDate(range.value[0]);
      setRightCalendarDate(range.value[1]);
    } else {
      setLeftCalendarDate(range.value[0]);
      setRightCalendarDate(getNextMonth(range.value[0]));
    }
    handleOnOk(range.value[0], range.value[1]);
  };

  return (
    <RangePickerProvider
      value={{
        defaultDay,
        setDefaultDay,
        selectedRange,
        setSelectedRange,
        leftCalendarDate,
        setLeftCalendarDate,
        rightCalendarDate,
        setRightCalendarDate,
      }}
    >
      <div className="range-picker">
        <RangePickerInput
          onClick={() => setIsOpen((prev) => !prev)}
          value={inputValue}
          setValue={setInputValue}
        />
        {isOpen && (
          <div className="range-picker-popover">
            <div className="range-picker-popover-header">
              {formattedFromDate || DEFAULTFORMAT} ~{" "}
              {formattedToDate || DEFAULTFORMAT}
            </div>
            <div>
              <Calendar
                type="left"
                currentDate={leftCalendarDate}
                handleNextBtnClick={() => {
                  setLeftCalendarDate(getNextMonth(leftCalendarDate));
                  //check if the difference is 1 if not change right calendar as well
                  const monthDiff = getDifferenceInMonth(
                    leftCalendarDate,
                    rightCalendarDate
                  );

                  if (monthDiff === 1) {
                    setRightCalendarDate(getNextMonth(rightCalendarDate));
                  }
                }}
                handlePrevBtnClick={() => {
                  setLeftCalendarDate(getPreviousMonth(leftCalendarDate));
                }}
              />
            </div>

            <div>
              <Calendar
                type="right"
                currentDate={rightCalendarDate}
                handleNextBtnClick={() => {
                  setRightCalendarDate(getNextMonth(rightCalendarDate));
                }}
                handlePrevBtnClick={() => {
                  setRightCalendarDate(getPreviousMonth(rightCalendarDate));
                  const monthDiff = getDifferenceInMonth(
                    leftCalendarDate,
                    rightCalendarDate
                  );

                  if (monthDiff === 1) {
                    setLeftCalendarDate(getPreviousMonth(leftCalendarDate));
                  }
                }}
              />
            </div>
            <div className="range-picker-popover-footer">
              <div className="range-picker-popover-predefinedrange">
                {predefinedRange?.length &&
                  predefinedRange.map((range) => (
                    <p onClick={() => handlePredefinedRangeClick(range)}>
                      {range.label}
                    </p>
                  ))}
              </div>
              <button
                className="range-picker-popover-okbtn"
                disabled={!selectedRange?.from || !selectedRange?.to}
                onClick={() =>
                  handleOnOk(selectedRange?.from, selectedRange?.to)
                }
              >
                Ok
              </button>
            </div>
          </div>
        )}
      </div>
    </RangePickerProvider>
  );
}
