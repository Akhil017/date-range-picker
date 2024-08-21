import { useState } from "react";
import RangePickerInput from "./range-picker-input";
import Calendar from "./calendar";
import "./range-picker.scss";
import {
  RangePickerProvider,
  type SelectedRange,
} from "./range-picker-context";
import { getFormattedDate } from "@/utils/helpers";

const defaultFormat = "MM/DD/YYYY";

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

  const formattedFromDate = getFormattedDate(selectedRange?.from);
  const formattedToDate = getFormattedDate(selectedRange?.to);

  const handlePredefinedRangeClick = (range: PredefinedRange) => {
    if (!range.value) return;
    setSelectedRange({
      from: range.value[0],
      to: range.value[1],
    });
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
              {formattedFromDate || defaultFormat} -{" "}
              {formattedToDate || defaultFormat}
            </div>
            <div>
              <Calendar index={0} />
            </div>
            <div>
              <Calendar index={1} />
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
                onClick={() => onOk()}
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
