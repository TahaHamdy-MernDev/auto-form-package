import React, { useState } from "react";
import type { FormFieldProps, PasswordFieldConfig } from "@/types";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Eye, EyeOff, Lock } from "lucide-react";
import { FieldError } from "@/components/ui/field";
import type { z } from "zod";
import { cn } from "@/lib";
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
  const classes = {
    wrapper: field.options?.classes?.wrapper,
    input: field.options?.classes?.input,
    addon_left: field.options?.classes?.addon_left,
    addon_right: field.options?.classes?.addon_right,
    error: field.options?.classes?.error,
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn(classes.wrapper)}>
      <InputGroup className="w-full">
        <InputGroupInput
          type={showPassword ? "text" : "password"}
          aria-invalid={fieldState.invalid}
          className={cn(classes.input)}
          id={form_id + "-" + field.name}
          {...controllerField}
          {...(field.placeholder && { placeholder: field.placeholder })}
        />

        {/* Left Icon */}
        {icons.left && (
          <InputGroupAddon className={cn(classes.addon_left)}>
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
              "cursor-pointer select-none " + (cn(classes.addon_right) ?? "")
            }
          >
            {showPassword ? icons.right_hide : icons.right_show}
          </InputGroupAddon>
        )}
      </InputGroup>

      <FieldError className={cn(classes.error)} errors={[fieldState.error]} />
    </div>
  );
}

PasswordFieldComponent.displayName = "PasswordField";
export const PasswordField = React.memo(PasswordFieldComponent);
