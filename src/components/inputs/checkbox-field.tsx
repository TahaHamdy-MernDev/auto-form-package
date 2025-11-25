import React, { memo, useMemo } from "react";
import type { CheckboxFieldConfig, FormFieldProps } from "@/auto-form/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field";
import type { z } from "zod";
import { cn } from "@/lib/utils";

interface CheckboxFieldProps<T extends z.ZodTypeAny>
  extends Omit<FormFieldProps, "field"> {
  field: CheckboxFieldConfig<T>;
}

const MemoizedLabel = memo(
  ({
    htmlFor,
    className,
    children,
  }: {
    htmlFor: string;
    className?: string;
    children: React.ReactNode;
  }) => (
    <Label htmlFor={htmlFor} className={className}>
      {children}
    </Label>
  )
);

// Memoized Checkbox component
const MemoizedCheckbox = memo(Checkbox);

function CheckboxFieldComponent<T extends z.ZodTypeAny>({
  controllerField,
  fieldState,
  field,
  form_id,
}: CheckboxFieldProps<T>) {
  const id = `${form_id}_${field.name}_checkbox`;

  // Memoize the label to prevent unnecessary re-renders
  const label = useMemo(() => {
    return field.label || String(field.name).replace(/_/g, " ");
  }, [field.label, field.name]);

  // Memoize the error message
  const errorMessage = useMemo(() => {
    return fieldState.error?.message;
  }, [fieldState.error]);

  // Memoize the class names
  const classes = useMemo(
    () => ({
      wrapper: cn(
        "flex items-center space-x-2",
        field.options?.classes?.wrapper
      ),
      input: field.options?.classes?.input,
      label: cn("text-sm font-medium", field.options?.classes?.label),
    }),
    [field.options?.classes]
  );

  return (
    <div className={classes.wrapper}>
      <MemoizedCheckbox
        id={id}
        checked={controllerField.value.toString()}
        onCheckedChange={controllerField.onChange}
        disabled={field.options?.disabled}
        className={cn("h-4 w-4", classes.input)}
      />
      <MemoizedLabel htmlFor={id} className={classes.label}>
        {label}
      </MemoizedLabel>
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </div>
  );
}

CheckboxFieldComponent.displayName = "CheckboxField";
export const CheckboxField = memo(
  CheckboxFieldComponent
) as typeof CheckboxFieldComponent;
