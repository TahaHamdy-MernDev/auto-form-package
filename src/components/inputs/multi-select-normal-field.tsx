import type { FormFieldProps, MultiSelectFieldConfig } from "@/auto-form/types";
import { FieldError } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import type { z } from "zod";
import { cn } from "@/lib/utils";
import React from "react";
interface MultiSelectNormalProps<T extends z.ZodTypeAny>
  extends Omit<FormFieldProps, "field"> {
  field: MultiSelectFieldConfig<T>;
}
function MultiSelectNormalComponent<T extends z.ZodTypeAny>({
  controllerField,
  field,
  fieldState,
  form_id,
}: MultiSelectNormalProps<T>) {
  const selectedValues: string[] = controllerField.value || [];

  const toggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      controllerField.onChange(selectedValues.filter((v) => v !== value));
    } else {
      controllerField.onChange([...selectedValues, value]);
    }
  };

  return (
    <div className="space-y-2">
      <div
        className={cn("border rounded-lg space-y-2", field.options_className)}
      >
        {field.multi_select_options?.map((opt) => {
          const isChecked = selectedValues.includes(opt.value);

          return (
            <div
              key={opt.value}
              className={cn("flex items-center gap-3", opt.className)}
            >
              <Checkbox
                id={`${form_id}_${field.name}_${opt.value}`}
                checked={isChecked}
                aria-invalid={fieldState.invalid}
                onCheckedChange={() => toggleValue(opt.value)}
              />

              <Label htmlFor={`${form_id}_${field.name}_${opt.value}`}>
                {opt.label}
              </Label>
            </div>
          );
        })}
      </div>

      <FieldError errors={[fieldState.error]} />
    </div>
  );
}

MultiSelectNormalComponent.displayName = "MultiSelectNormal";
export const MultiSelectNormal = React.memo(MultiSelectNormalComponent);
