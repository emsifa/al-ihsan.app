import { addDays, isLastDayOfMonth, startOfMonth } from "date-fns";
import { DateConversion, HijriDate } from "../types";
import { dateFormat } from "./utils";

function toHijri(date: Date): HijriDate {
  const intlFormat = "id-TN-u-ca-islamic-umalqura";
  const intlNumeric = new Intl.DateTimeFormat(intlFormat, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const numericParts = intlNumeric.formatToParts(date);

  const partValue = (parts: Intl.DateTimeFormatPart[], type: string) =>
    (parts.find((p) => p.type === type) || {}).value;

  const monthIndex = parseInt(partValue(numericParts, "month")) - 1;

  return {
    day: parseInt(partValue(numericParts, "day")),
    year: parseInt(partValue(numericParts, "year")),
    month: {
      index: monthIndex,
      name: getHijriMonthName(monthIndex),
    },
  };
}

function getDatesFillerBefore(date: Date): Date[] {
  const day = date.getDay();
  return Array(day)
    .fill(null)
    .map((_, i) => addDays(date, -1 * (day - i)));
}

function getDatesFillerAfter(date: Date): Date[] {
  const day = date.getDay();
  return Array(6 - day)
    .fill(null)
    .map((_, i) => addDays(date, i + 1));
}

export function getCalendarDates(date: Date): DateConversion[] {
  const start = startOfMonth(date);
  const dates = [start];

  while (true) {
    const last = dates[dates.length - 1];
    if (isLastDayOfMonth(last)) {
      break;
    }
    dates.push(addDays(last, 1));
  }

  return [
    ...getDatesFillerBefore(dates[0]),
    ...dates,
    ...getDatesFillerAfter(dates[dates.length - 1]),
  ].map((date) => {
    const dateStr = dateFormat(date, "yyyy-MM-dd");
    return {
      date: new Date(dateStr),
      dateStr,
      hijri: toHijri(new Date(dateStr)),
      isOtherMonth: start.getMonth() !== date.getMonth(),
    };
  });
}

export function getHijriMonthName(index: number): string | null {
  return (
    [
      "Muharram",
      "Shafar",
      "Rabiul Awal",
      "Rabiul Akhir",
      "Jumadil Awal",
      "Jumadil Akhir",
      "Rajab",
      "Syaban",
      "Ramadhan",
      "Syawal",
      "Zulqaidah",
      "Zulhijjah",
    ][index] || null
  );
}
