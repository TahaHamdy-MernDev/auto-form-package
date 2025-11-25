import React, { useState } from "react";
import type { FormFieldProps, PasswordFieldConfig } from "@/auto-form/types";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeOff, Lock } from "lucide-react";
import { FieldError } from "@/components/ui/field";
import type { z } from "zod";
interface PasswordFieldProps<T extends z.ZodTypeAny>
  extends Omit<FormFieldProps, "field"> {
  field: PasswordFieldConfig<T>;
}
function PasswordFieldComponent<T extends z.ZodTypeAny>({
  controllerField,
  fieldState,
  field,
  form_id,
}: PasswordFieldProps<T>) {
  const icons = {
    left: field.options?.addons?.left ?? <Lock />,
    right_show: field.options?.addons?.right ?? <Eye />,
    right_hide: field.options?.addons?.right ?? <EyeOff />,
  };
  const classes = {};
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <InputGroup className="w-full">
        <InputGroupInput
          type={showPassword ? "text" : "password"}
          aria-invalid={fieldState.invalid}
          className={field.options?.classes?.input}
          id={form_id + "-" + field.name}
          {...controllerField}
          {...(field.placeholder && { placeholder: field.placeholder })}
        />

        {/* Left Icon */}
        {icons.left && (
          <InputGroupAddon className={field.options?.classes?.addon_left}>
            {icons.left}
          </InputGroupAddon>
        )}

        {/* Right Icon (Toggle) */}
        {field.password_options?.toggle !== false && (
          <InputGroupAddon
            align="inline-end"
            onClick={() => setShowPassword((v) => !v)}
            role="button"
            className={
              "cursor-pointer select-none " +
              (field.options?.classes?.addon_right ?? "")
            }
          >
            {showPassword ? icons.right_hide : icons.right_show}
          </InputGroupAddon>
        )}
      </InputGroup>

      <FieldError errors={[fieldState.error]} />
    </>
  );
}

PasswordFieldComponent.displayName = "PasswordField";
export const PasswordField = React.memo(PasswordFieldComponent);
