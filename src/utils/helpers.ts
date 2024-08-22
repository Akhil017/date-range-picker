import { MONTHS } from "./constants";

export function getMonthAndYear(date: Date) {
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function getFormattedDate(date: Date | null) {
  if (!date) return "";
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

export function getCurrentDay(date: Date | null, index: number = 0) {
  if (!date) return null;
  return new Date(date.getFullYear(), date.getMonth() + index, date.getDay());
}

export function getNextMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, date.getDate());
}

export function getPreviousMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth() - 1, date.getDate());
}

export function getDifferenceInMonth(dateFrom: Date, dateTo: Date) {
  return (
    dateTo.getMonth() -
    dateFrom.getMonth() +
    12 * (dateTo.getFullYear() - dateFrom.getFullYear())
  );
}

export function getWeekendsByRange(dateFrom: Date, dateTo: Date) {
  const weekends: string[] = [];
  const current = new Date(dateFrom);
  while (current < dateTo) {
    if (current.getDay() === 0 || current.getDay() === 6) {
      const formattedWeekend = getFormattedDate(current);
      weekends.push(formattedWeekend);
      if (current.getDay() === 0) {
        current.setDate(current.getDate() + 6);
      } else {
        current.setDate(current.getDate() + 1);
      }
    } else {
      current.setDate(current.getDate() + 1);
    }
  }

  return weekends;
}

export function checkIsWeekEnd(date: Date) {
  if (date.getDay() === 0 || date.getDay() === 6) {
    return true;
  }

  return false;
}

export function getNextYear(date: Date) {
  return new Date(date.getFullYear() + 1, date.getMonth(), date.getDate());
}

export function getPreviousYear(date: Date) {
  return new Date(date.getFullYear() - 1, date.getMonth(), date.getDate());
}
