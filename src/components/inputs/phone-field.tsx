import { PhoneField as PhoneFieldComponent } from "@/components/ui/phone-input";
import type {
  FormFieldProps,
  InternationalFieldConfig,
} from "@/auto-form/types";
import { FieldError } from "@/components/ui/field";
import type { Country } from "react-phone-number-input";
import * as React from "react";
import type { z } from "zod";
interface PhoneNumberFieldProps<T extends z.ZodTypeAny>
  extends Omit<FormFieldProps, "field"> {
  field: InternationalFieldConfig<T>;
}
function PhoneNumberFieldComponent<T extends z.ZodTypeAny>({
  field,
  controllerField,
  fieldState,
  form_id,
}: PhoneNumberFieldProps<T>) {
  return (
    <div className="flex flex-col gap-1">
      <PhoneFieldComponent
        id={`${form_id}_${field.name}_phone`}
        placeholder={field.placeholder}
        value={controllerField.value || ""}
        onChange={controllerField.onChange}
        international
        defaultCountry={
          (field.country?.toString().toUpperCase() as Country) || "SA"
        }
        limitMaxLength
      />
      <FieldError errors={[fieldState.error]} />
    </div>
  );
}
PhoneNumberFieldComponent.displayName = "PhoneField";
export const PhoneField = React.memo(PhoneNumberFieldComponent);
