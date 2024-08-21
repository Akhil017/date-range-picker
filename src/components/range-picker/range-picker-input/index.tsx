import * as React from "react";

import { Icons } from "@/components/icons";
import "./range-picker-input.scss";

const DateRangeInput = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ ...props }, ref) => (
  <div className="range-picker-input" {...props} ref={ref}>
    <input />
    <Icons.calendar />
  </div>
));

export default DateRangeInput;
