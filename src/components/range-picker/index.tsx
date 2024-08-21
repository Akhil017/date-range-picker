import { useState } from "react";
import RangePickerInput from "./range-picker-input";
import Calendar from "./calendar";
import "./range-picker.scss";
import {
  RangePickerProvider,
  type SelectedRange,
} from "./range-picker-context";

export default function RangePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultDay, setDefaultDay] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState<SelectedRange>({
    from: null,
    to: null,
  });

  return (
    <RangePickerProvider
      value={{ defaultDay, setDefaultDay, selectedRange, setSelectedRange }}
    >
      <div className="range-picker">
        <RangePickerInput onClick={() => setIsOpen((prev) => !prev)} />
        {isOpen && (
          <div className="range-picker-popover">
            <div className="range-picker-popover-header">header</div>
            <div>
              <Calendar index={0} />
            </div>
            <div>
              <Calendar index={1} />
            </div>
            <div className="range-picker-popover-footer">footer</div>
          </div>
        )}
      </div>
    </RangePickerProvider>
  );
}
