import { MONTHS } from "./constants";

export function getMonthAndYear(date: Date) {
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

export function getFormattedDate(date: Date | null) {
  if (!date) return "";
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
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
