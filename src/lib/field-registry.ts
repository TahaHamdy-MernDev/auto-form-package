// field-registry.ts
import { FieldConfig } from "@/auto-form/types";
import * as Inputs from "@/components/inputs";

export const FIELD_COMPONENTS: Record<FieldConfig["field_type"], any> = {
  text: Inputs.NormalField,
  email: Inputs.NormalField,
  password: Inputs.PasswordField,
  select: Inputs.SelectField,
  checkbox: Inputs.CheckboxField,
  multi_select: Inputs.MultiSelectNormal,
  radio: Inputs.RadioField,
  single_date: Inputs.SingleDateField,
  range_date: Inputs.DateRangeField,
  textarea: Inputs.TextareaField,
  localized_text: Inputs.LocalizedField,
  variants: Inputs.VariantFieldArray,
  phone: Inputs.PhoneField,
  file: Inputs.FileField,
  files: Inputs.FileField,
  rich_text: Inputs.RichTextField,
};
