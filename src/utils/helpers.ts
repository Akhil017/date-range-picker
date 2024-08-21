import { MONTHS } from "./constants";

export function getMonthAndYear(date: Date) {
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function getFormattedDate(date: Date | null) {
  if (!date) return "";
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
}
