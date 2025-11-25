import React from "react";
import { FieldContent, FieldError } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import type { FormFieldProps, TextFieldConfig } from "@/auto-form/types";
import type { z } from "zod";
import { cn } from "@/lib/utils";
interface NormalFieldProps<T extends z.ZodTypeAny>
  extends Omit<FormFieldProps, "field"> {
  field: TextFieldConfig<T>;
}
function NormalFieldComponent<T extends z.ZodTypeAny>({
  controllerField,
  fieldState,
  field,
  form_id,
}: NormalFieldProps<T>) {
  const [isDisabled, setIsDisabled] = React.useState(field.options?.disabled);
  const classes = {
    wrapper: field.options?.classes?.wrapper,
    input: field.options?.classes?.input,
    label: field.options?.classes?.label,
    error: field.options?.classes?.error,
    left_addon: field.options?.classes?.addon_left,
    right_addon: field.options?.classes?.addon_right,
  };

  return (
    <FieldContent>
      <InputGroup className={classes.wrapper}>
        <InputGroupInput
          {...controllerField}
          value={String(controllerField.value ?? "")}
          id={form_id + "-" + field.name}
          {...(field.placeholder && {
            placeholder: field.placeholder,
          })}
          disabled={isDisabled}
          readOnly={isDisabled}
          aria-readonly={isDisabled}
          aria-invalid={fieldState.invalid}
          type={field.field_type}
          className={cn(classes.input, isDisabled && "cursor-not-allowed")}
        />
        {field.options?.addons?.left && (
          <InputGroupAddon align="inline-start">
            {field.options?.addons?.left}
          </InputGroupAddon>
        )}
        {field.options?.addons?.right && (
          <InputGroupAddon align="inline-end">
            {field.options?.addons?.right}
          </InputGroupAddon>
        )}
      </InputGroup>
      <FieldError errors={[fieldState.error]} />
    </FieldContent>
  );
}
NormalFieldComponent.displayName = "NormalField";

export const NormalField = React.memo(NormalFieldComponent);
