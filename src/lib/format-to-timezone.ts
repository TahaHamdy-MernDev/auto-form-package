import { formatInTimeZone } from "date-fns-tz";

export default function formatToTimezone(d: Date, tz: string) {
  return formatInTimeZone(d, tz, "yyyy-MM-dd");
}
