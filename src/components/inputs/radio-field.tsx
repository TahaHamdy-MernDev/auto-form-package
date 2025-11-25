import * as React from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { FormFieldProps, RadioFieldConfig } from "@/auto-form/types";
import { FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import type { z } from "zod";
interface RadioFieldProps<T extends z.ZodTypeAny>
  extends Omit<FormFieldProps, "field"> {
  field: RadioFieldConfig<T>;
}
function RadioFieldComponent<T extends z.ZodTypeAny>({
  controllerField,
  fieldState,
  field,
  form_id,
}: RadioFieldProps<T>) {
  return (
    <>
      <RadioGroup
        {...controllerField}
        aria-invalid={fieldState.invalid}
        value={controllerField.value}
        onValueChange={controllerField.onChange}
        className={cn(field.options_className)}
      >
        <RadioGroupItem value="" hidden disabled defaultChecked />
        {field.radio_options?.map((option, idx) => (
          <div
            className={cn("flex items-center gap-3", option.className)}
            key={idx}
          >
            <RadioGroupItem
              value={option.value}
              id={`${form_id}-${option.value}`}
            />
            <Label htmlFor={`${form_id}-${option.value}`}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <FieldError errors={[fieldState.error]} />
    </>
  );
}
RadioFieldComponent.displayName = "RadioField";
export const RadioField = React.memo(RadioFieldComponent);
