import { addDays, format, isLastDayOfMonth, startOfMonth } from "date-fns";
import { DateConversion, HijriDate } from "../types";

function toHijri(date: Date): HijriDate {
  const intlFormat = "id-TN-u-ca-islamic-umalqura";
  const intlNumeric = new Intl.DateTimeFormat(intlFormat, {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  const intlMonth = new Intl.DateTimeFormat(intlFormat, {
    month: "long",
  });
  const intlMonthShort = new Intl.DateTimeFormat(intlFormat, {
    month: "short",
  });

  const numericParts = intlNumeric.formatToParts(date);
  const monthParts = intlMonth.formatToParts(date);
  const monthShortParts = intlMonthShort.formatToParts(date);

  const partValue = (parts: Intl.DateTimeFormatPart[], type: string) =>
    (parts.find((p) => p.type === type) || {}).value;

  return {
    day: parseInt(partValue(numericParts, "day")),
    year: parseInt(partValue(numericParts, "year")),
    month: {
      index: parseInt(partValue(numericParts, "month")) - 1,
      name: partValue(monthParts, "month"),
      nameShort: partValue(monthShortParts, "month"),
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
    const dateStr = format(date, "yyyy-MM-dd");
    return {
      date: new Date(dateStr),
      dateStr,
      hijri: toHijri(new Date(dateStr)),
      isOtherMonth: start.getMonth() !== date.getMonth(),
    };
  });
}
