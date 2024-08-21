import { useState } from "react";
import RangePickerInput from "./range-picker-input";
import Calendar from "./calendar";
import "./range-picker.scss";

export default function RangePicker() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="range-picker">
      <RangePickerInput onClick={() => setIsOpen(true)} />
      {isOpen && (
        <div className="range-picker-popover">
          <div className="range-picker-popover-header">header</div>
          <div className="range-picker-popover-calendar">
            <Calendar />
          </div>
          <div className="range-picker-popover-calendar">
            <Calendar />
          </div>
          <div className="range-picker-popover-footer">footer</div>
        </div>
      )}
    </div>
  );
}
