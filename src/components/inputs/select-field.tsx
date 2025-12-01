import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FormFieldProps, SelectFieldConfig } from "@/types";
import type { z } from "zod";

interface SelectFieldProps<T extends z.ZodTypeAny>
  extends Omit<FormFieldProps, "field"> {
  field: SelectFieldConfig<T>;
}

const SelectFieldComponent = React.forwardRef<
  HTMLButtonElement,
  SelectFieldProps<z.ZodTypeAny>
>(({ field, controllerField, fieldState, form_id }, ref) => {
  const { ref: _, ...controllerRest } = controllerField as any;

  return (
    <Select
      {...controllerRest}
      onValueChange={controllerField.onChange}
      defaultValue={controllerField.value}
    >
      <SelectTrigger
        ref={ref}
        id={form_id + "_" + field.name}
        aria-invalid={fieldState.invalid}
      >
        <SelectValue placeholder={field.placeholder} />
      </SelectTrigger>
      <SelectContent>
        {field.select_options?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
});
SelectFieldComponent.displayName = "SelectField";
export const SelectField = React.memo(SelectFieldComponent);
