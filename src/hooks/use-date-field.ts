/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import type { DateRange } from "react-day-picker";
import { toZonedTime, fromZonedTime } from "date-fns-tz";
import formatToTimezone from "../lib/format-to-timezone";

export type DateMode = "single" | "range";

interface UseDateFieldOptions {
  mode: DateMode;
  controllerValue: any;
  onChange: (value: any) => void;
  locale?: string;
  timeZone?: string;
}

export const useDateField = ({
  mode,
  controllerValue,
  onChange,
  locale: propLocale,
  timeZone: propTimeZone,
}: UseDateFieldOptions) => {
  const locale = propLocale ?? Intl.DateTimeFormat().resolvedOptions().locale;
  const timeZone =
    propTimeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone ?? "UTC";

  const [open, setOpen] = React.useState(false);

  // Local value inside the popover (always Date | DateRange | null/undefined in user's timezone)
  const [localValue, setLocalValue] = React.useState<
    Date | DateRange | null | undefined
  >(mode === "single" ? null : undefined);

  // Sync controller → local when popover opens
  React.useEffect(() => {
    if (!open) return;

    if (mode === "single") {
      if (!controllerValue) {
        setLocalValue(null);
      } else {
        const date = new Date(controllerValue); // expects ISO string
        setLocalValue(toZonedTime(date, timeZone));
      }
    }

    if (mode === "range") {
      if (!controllerValue || !controllerValue.from || !controllerValue.to) {
        setLocalValue(undefined);
      } else {
        const from = new Date(controllerValue.from);
        const to = new Date(controllerValue.to);
        setLocalValue({
          from: toZonedTime(from, timeZone),
          to: toZonedTime(to, timeZone),
        });
      }
    }
  }, [open, controllerValue, mode, timeZone]);

  // Format for display only
  const displayValue = React.useMemo(() => {
    if (mode === "single") {
      const value = open
        ? (localValue as Date | null)
        : controllerValue
        ? toZonedTime(new Date(controllerValue), timeZone)
        : null;

      if (!value || !(value instanceof Date)) return "";
      return formatToTimezone(value, timeZone);
    }

    // range
    const range = (open ? localValue : controllerValue) as
      | DateRange
      | { from: string; to: string }
      | undefined;

    if (!range?.from || !range?.to) return "";

    const fromDate =
      range.from instanceof Date ? range.from : new Date(range.from);
    const toDate = range.to instanceof Date ? range.to : new Date(range.to);

    return `${formatToTimezone(
      toZonedTime(fromDate, timeZone),
      timeZone
    )} – ${formatToTimezone(toZonedTime(toDate, timeZone), timeZone)}`;
  }, [localValue, controllerValue, open, mode, timeZone]);

  const confirm = () => {
    if (mode === "single") {
      const date = localValue as Date | null;
      if (!date) {
        onChange(null);
      } else {
        const utc = fromZonedTime(date, timeZone);
        onChange(utc.toISOString());
      }
    }

    if (mode === "range") {
      const range = localValue as DateRange | undefined;

      if (!range?.from || !range?.to) {
        onChange({ from: null, to: null });
      } else {
        onChange({
          from: fromZonedTime(range.from, timeZone).toISOString(),
          to: fromZonedTime(range.to, timeZone).toISOString(),
        });
      }
    }

    setOpen(false);
  };

  const reset = () => {
    setLocalValue(mode === "single" ? null : undefined);
    onChange(mode === "single" ? "" : { from: "", to: "" });
  };

  return {
    locale,
    timeZone,
    open,
    setOpen,
    localValue,
    setLocalValue,
    displayValue,
    confirm,
    reset,
  };
};
export default useDateField;
