import { FormFieldProps, RangeDateFieldConfig } from "@/auto-form/types";
import React from "react";
const Calendar = React.lazy(() => import("@/components/ui/calendar"));
import type { DateRange, Locale } from "react-day-picker";
import type { z } from "zod";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { startOfMonth } from "date-fns";
import { useDateField } from "@/hooks";

interface DateRangeFieldProps<T extends z.ZodTypeAny>
  extends Omit<FormFieldProps, "field"> {
  field: RangeDateFieldConfig<T>;
}
function DateRangeFieldComponent<T extends z.ZodTypeAny>({
  field,
  controllerField,
  fieldState,
  form_id,
}: DateRangeFieldProps<T>) {
  const [isDisabled, setIsDisabled] = React.useState(field.options?.disabled);
  const {
    locale,
    open,
    setOpen,
    localValue,
    setLocalValue,
    displayValue,
    confirm,
    reset,
  } = useDateField({
    mode: "range",
    controllerValue: controllerField.value,
    onChange: controllerField.onChange,
    locale: field.date_config?.locale,
    timeZone: field.date_config?.timeZone,
  });

  const classes = {
    wrapper: field.options?.classes?.wrapper,
    input: field.options?.classes?.input,
    label: field.options?.classes?.label,
    error: field.options?.classes?.error,
    left_addon: field.options?.classes?.addon_left,
    right_addon: field.options?.classes?.addon_right,
  };
  const today = new Date();
  const startMonth = startOfMonth(today);
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <InputGroup>
          <InputGroupInput
            id={`${form_id}_${field.name}_input_range`}
            placeholder={field.placeholder}
            value={displayValue}
            readOnly
            onClick={() => setOpen(true)}
            aria-invalid={fieldState.invalid}
            className={cn(
              "cursor-pointer relative",
              fieldState.invalid && "border-destructive",
              classes.input
            )}
            {...(field.placeholder && {
              placeholder: field.placeholder,
            })}
            disabled={isDisabled}
            aria-readonly={isDisabled}
          />
          <InputGroupAddon
            role="button"
            tabIndex={0}
            onClick={() => setOpen(true)}
            className="cursor-pointer"
          >
            <CalendarIcon />
          </InputGroupAddon>
        </InputGroup>
      </PopoverTrigger>

      <PopoverContent
        className="w-auto flex overflow-hidden p-0 rounded-md"
        // align="center"
      >
        <React.Suspense fallback={<Spinner />}>
          <Separator orientation="vertical" className="h-full" />
          <div>
            <Calendar
              id={`${form_id}_${field.name}_range`}
              mode="range"
              defaultMonth={startMonth}
              numberOfMonths={2}
              selected={localValue as DateRange | undefined}
              onSelect={(r) => setLocalValue(r)}
              disabled={field.disabled_date}
              dir="rtl"
              locale={locale as unknown as Partial<Locale>}
              initialFocus
            />
            <Separator className="my-1" />
            <div className="flex justify-between items-center gap-1 px-2 py-1">
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="border-none shadow-none"
                onClick={reset}
              >
                {field.buttons?.reset || "Reset"}
              </Button>
              <div className="flex gap-1">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  className="border-none shadow-none"
                  onClick={() => setOpen(false)}
                >
                  {field.buttons?.close || "Close"}
                </Button>
                <Button type="button" size="sm" onClick={confirm}>
                  {field.buttons?.confirm || "Confirm"}
                </Button>
              </div>
            </div>
          </div>
        </React.Suspense>
      </PopoverContent>
    </Popover>
  );
}
DateRangeFieldComponent.displayName = "DateRangeField";
export const DateRangeField = React.memo(DateRangeFieldComponent);