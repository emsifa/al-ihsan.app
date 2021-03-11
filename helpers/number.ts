import { NumberSeparator } from "../types";

export function thousandSeparator(separatorType: NumberSeparator) {
  switch (separatorType) {
    case "comma":
      return ",";
    case "period":
      return ".";
    case "space":
      return " ";
    default:
      return "";
  }
}

export function commaSeparator(separatorType: NumberSeparator) {
  switch (separatorType) {
    case "comma":
      return ".";
    case "period":
      return ",";
    case "space":
      return ",";
    default:
      return "";
  }
}

export function formatNumber(
  number: number | string,
  separatorType: NumberSeparator
): string {
  const thousand = thousandSeparator(separatorType);
  const comma = commaSeparator(separatorType);

  return (number || "")
    .toString()
    .replace(/^0/g, "")
    .replace(".", "!!")
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${thousand}`)
    .replace("!!", comma);
}

export function reformatNumber(
  value: string,
  separatorType: NumberSeparator
): string {
  const thousand = thousandSeparator(separatorType);
  const comma = commaSeparator(separatorType);

  return value
    .replace(new RegExp(quoteRegex(thousand), "g"), "")
    .replace(new RegExp(quoteRegex(comma), "g"), ".");
}

export function getDecimalCount(number: string | number): number {
  const num = number.toString();
  const spl = num.split(".");
  return spl.length > 1 ? spl[1].length : 0;
}

function quoteRegex(chr: string): string {
  if (chr === ".") {
    return "\\.";
  }
  return chr;
}
