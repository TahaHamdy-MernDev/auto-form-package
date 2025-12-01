import { Textarea } from "@/components/ui/textarea";
import type { FormFieldProps, TextareaFieldConfig } from "@/types";
import { FieldError } from "@/components/ui/field";
import React from "react";
import type { z } from "zod";
import { cn } from "@/lib";
interface TextareaFieldProps<T extends z.ZodTypeAny>
  extends Omit<FormFieldProps, "field"> {
  field: TextareaFieldConfig<T>;
}
function TextareaFieldComponent<T extends z.ZodTypeAny>({
  field,
  controllerField,
  fieldState,
  form_id,
}: TextareaFieldProps<T>) {
  return (
    <div className={cn(field.options?.classes?.wrapper)}>
      <Textarea
        {...controllerField}
        id={`${form_id}_${field.name}_textarea`}
        aria-invalid={fieldState.invalid}
        {...(field.placeholder && {
          placeholder: field.placeholder,
        })}
        className={cn(field.options?.classes?.input)}
      />
      <FieldError
        className={cn(field.options?.classes?.error)}
        errors={[fieldState.error]}
      />
    </div>
  );
}
TextareaFieldComponent.displayName = "TextareaField";
export const TextareaField = React.memo(TextareaFieldComponent);
