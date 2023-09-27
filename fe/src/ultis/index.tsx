import { DateFormatType } from "../interfaces/IRouter";

export const removeUnnecessaryWhiteSpace = (string: string | undefined) => {
  if (!string) return undefined;
  const result = string.trim().replace(/ +/g, " ");
  if (result === "") return undefined;
  return result;
};

export const getDate = (day: Date, time: Date) => {
  day.setHours(time.getHours(), time.getMinutes(), time.getSeconds());
  return day.getTime();
};

export const dateFormat = (date: Date, format: DateFormatType) => {
  const time: Date = new Date(date);
  const formattedDate = time.toLocaleString(
    "en-US",
    getDateFormatByLocale(format)
  );
  return formattedDate;
};

export const getDateFormatByLocale: (
  format: DateFormatType
) => Intl.DateTimeFormatOptions = (format) => {
  switch (format) {
    case DateFormatType.Date:
      return {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      };
    case DateFormatType.FullDate:
      return {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
    default:
      return {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      };
  }
};
