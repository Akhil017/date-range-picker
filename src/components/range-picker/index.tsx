import { ElementRef, useEffect, useRef, useState } from "react";
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
  getRangePickerTitle,
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

  //refs to handle popover
  const popoverRef = useRef<ElementRef<"div">>(null);
  const inputRef = useRef<ElementRef<"div">>(null);

  const [inputValue, setInputValue] = useState(
    `${DEFAULTFORMAT} ~ ${DEFAULTFORMAT}`
  );

  // states which handle individual calendars
  const [leftCalendarDate, setLeftCalendarDate] = useState(new Date());
  const [rightCalendarDate, setRightCalendarDate] = useState(
    getNextMonth(new Date())
  );

  //handle popover outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      event.stopPropagation();
      if (
        !popoverRef.current?.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.addEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // on ok will give the range and weekends as array of array, where first array is range and second array is weekdays
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
    //making sure difference between left and right calendar is atleast 1 month
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

  const rangePickerTitle = getRangePickerTitle(
    selectedRange.from,
    selectedRange.to
  );

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
          ref={inputRef}
          onClick={() => setIsOpen(true)}
          value={inputValue}
          setValue={setInputValue}
        />
        {isOpen && (
          <div className="range-picker-popover" ref={popoverRef}>
            <div className="range-picker-popover-header">
              {rangePickerTitle}
            </div>
            <div>
              <Calendar type="left" />
            </div>

            <div>
              <Calendar type="right" />
            </div>
            <div className="range-picker-popover-footer">
              <div className="range-picker-popover-predefinedrange">
                {predefinedRange?.length &&
                  predefinedRange.map((range) => (
                    <p
                      onClick={() => handlePredefinedRangeClick(range)}
                      key={range.label}
                    >
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
