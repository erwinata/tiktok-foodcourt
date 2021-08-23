import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const resRelativeTime = (dateRaw: Date, unit: any, timeLabel: string) => {
  const diffYear = dayjs().diff(dateRaw, unit);
  if (diffYear > 0) {
    return diffYear + timeLabel;
  } else return null;
};

export const simpleRelativeTime = (dateRaw: Date) => {
  const units = ["y", "M", "w", "d", "h", "m", "s"];
  const timeLabels = ["thn", "bln", "mg", " hari", "jam", "m", "d"];

  let result = "";

  for (let i = 0; i < units.length; i++) {
    const a = resRelativeTime(dateRaw, units[i], timeLabels[i]);
    if (a) {
      result = a;
      break;
    }
  }

  return result;
};

export const isDateBetween = (
  date: Date | string,
  start: Date | string,
  end: Date | string,
  includeStart = false,
  includeEnd = false
) => {
  const dayCurrent = dayjs(date);

  const dayStart = dayjs(start).subtract(includeStart ? 1 : 0, "day");
  const dayEnd = dayjs(end).add(includeEnd ? 1 : 0, "day");

  return dayCurrent.isAfter(dayStart) && dayCurrent.isBefore(dayEnd);
};
