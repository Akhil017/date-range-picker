import * as React from "react";

import { Icons } from "@/components/icons";
import "./range-picker-input.scss";
import { getFormattedDate } from "@/utils/helpers";
import { useRangePickerContext } from "../range-picker-context";
import { DEFAULTFORMAT } from "@/utils/constants";

const DateRangeInput = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => {
  const { selectedRange } = useRangePickerContext();

  const formattedFromDate = getFormattedDate(selectedRange?.from);
  const formattedToDate = getFormattedDate(selectedRange?.to);

  const processed = `${formattedFromDate || DEFAULTFORMAT} - ${
    formattedToDate || DEFAULTFORMAT
  }`;

  return (
    <div className="range-picker-input" {...props} ref={ref}>
      <input value={processed} />
      <Icons.calendar />
    </div>
  );
});

export default DateRangeInput;
