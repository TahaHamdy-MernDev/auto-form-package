import React from "react";
import type { FormFieldProps } from "@/auto-form/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
const Calendar = React.lazy(() => import("@/components/ui/calendar"));
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { FieldError } from "@/components/ui/field";
import type { Locale } from "react-day-picker";
import { Spinner } from "@/components/ui/spinner";
import type { z } from "zod";
import type { SingleDateFieldConfig } from "@/auto-form/types";
import { useDateField } from "@/hooks";
interface SingleDateFieldProps<T extends z.ZodTypeAny>
  extends Omit<FormFieldProps, "field"> {
  field: SingleDateFieldConfig<T>;
}
function SingleDateFieldComponent<T extends z.ZodTypeAny>({
  field,
  controllerField,
  fieldState,
  form_id,
}: SingleDateFieldProps<T>) {
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
    mode: "single",
    controllerValue: controllerField.value,
    onChange: controllerField.onChange,
  });

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div className="w-full">
            <InputGroup>
              <InputGroupInput
                id={`${form_id}_${field.name}_input`}
                placeholder={field.placeholder}
                value={displayValue}
                readOnly
                onClick={() => setOpen(true)}
                aria-invalid={fieldState.invalid}
                className={cn(
                  "cursor-pointer",
                  fieldState.invalid && "border-destructive"
                )}
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
          </div>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0" align="center">
          <React.Suspense fallback={<Spinner />}>
            <Calendar
              id={`${form_id}_${field.name}`}
              mode="single"
              selected={(localValue ?? undefined) as Date | undefined}
              onSelect={(date) => setLocalValue(date ?? null)}
              disabled={field.disabled_date}
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
          </React.Suspense>
        </PopoverContent>
      </Popover>

      <FieldError errors={[fieldState.error]} />
    </>
  );
}
SingleDateFieldComponent.displayName = "SingleDateField";
export const SingleDateField = React.memo(SingleDateFieldComponent);
