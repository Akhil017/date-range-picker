import { createContext, useContext } from "react";

export type SelectedRange = {
  from: Date | null;
  to: Date | null;
};

type RangePickerContext = {
  defaultDay: Date;
  setDefaultDay: React.Dispatch<React.SetStateAction<Date>>;
  selectedRange: SelectedRange;
  setSelectedRange: React.Dispatch<React.SetStateAction<SelectedRange>>;
};

const RangePickerContext = createContext<RangePickerContext | null>(null);

export const RangePickerProvider = RangePickerContext.Provider;

export const useRangePickerContext = () => {
  const context = useContext(RangePickerContext);
  if (!context) {
    throw new Error(
      "DateRangePicker context must be used within DateRangePickerProvider"
    );
  }
  return context;
};
