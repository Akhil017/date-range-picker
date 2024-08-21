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

  const [leftCalendarDate, setLeftCalendarDate] = useState(new Date());
  const [rightCalendarDate, setRightCalendarDate] = useState(
    getNextMonth(new Date())
  );

  const formattedFromDate = getFormattedDate(selectedRange?.from);
  const formattedToDate = getFormattedDate(selectedRange?.to);

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
    setIsOpen(false);
  };

  const handleOnOk = () => {
    if (selectedRange?.from && selectedRange?.to) {
      const weekends = getWeekendsByRange(
        selectedRange?.from,
        selectedRange?.to
      );
      onOk([
        [
          getFormattedDate(selectedRange.from),
          getFormattedDate(selectedRange.to),
        ],
        weekends,
      ]);
    }
    setIsOpen(false);
  };

  return (
    <RangePickerProvider
      value={{ defaultDay, setDefaultDay, selectedRange, setSelectedRange }}
    >
      <div className="range-picker">
        <RangePickerInput onClick={() => setIsOpen((prev) => !prev)} />
        {isOpen && (
          <div className="range-picker-popover">
            <div className="range-picker-popover-header">
              {formattedFromDate || DEFAULTFORMAT} -{" "}
              {formattedToDate || DEFAULTFORMAT}
            </div>
            <div>
              <Calendar
                currenDate={leftCalendarDate}
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
                currenDate={rightCalendarDate}
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
                onClick={() => handleOnOk()}
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
