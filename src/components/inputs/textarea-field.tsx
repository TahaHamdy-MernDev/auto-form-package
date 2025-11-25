import { Textarea } from "@/components/ui/textarea";
import type { FormFieldProps, TextareaFieldConfig } from "@/auto-form/types";
import { FieldError } from "@/components/ui/field";
import React from "react";
import type { z } from "zod";
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
    <>
      <Textarea
        {...controllerField}
        id={`${form_id}_${field.name}_textarea`}
        aria-invalid={fieldState.invalid}
        {...(field.placeholder && {
          placeholder: field.placeholder,
        })}
      />
      <FieldError errors={[fieldState.error]} />
    </>
  );
}
TextareaFieldComponent.displayName = "TextareaField";
export const TextareaField = React.memo(TextareaFieldComponent);
