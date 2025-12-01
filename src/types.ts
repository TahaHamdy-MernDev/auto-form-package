import type { Matcher } from "react-day-picker";
import type {
  ControllerFieldState,
  ControllerRenderProps,
  Path,
} from "react-hook-form";
import type { z } from "zod";
import type { DefaultValues } from "react-hook-form";
export type VariantConfig = Omit<FieldConfig, "name"> & { name: string };
export type FieldTypes =
  | "text"
  | "email"
  | "password"
  | "date"
  | "select"
  | "checkbox"
  | "multi_select"
  | "textarea"
  | "radio"
  | "single_date"
  | "range_date"
  | "phone"
  | "variants"
  | "localized_text"
  | "rich_text"
  | "file"
  | "files";
export interface FieldOptions {
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  autoSelect?: boolean;

  tooltip?: string;
  helpText?: string;

  icons?: {
    left?: React.ReactNode;
    right?: React.ReactNode;
    show?: React.ReactNode;
    hide?: React.ReactNode;
  };

  classes?: {
    wrapper?: string;
    input?: string;
    label?: string;
    description?: string;
    error?: string;
    addon_left?: string;
    addon_right?: string;
  };

  addons?: {
    left?: React.ReactNode;
    right?: React.ReactNode;
  };
}

export type BaseFieldConfig<TSchema extends z.ZodTypeAny> = {
  name: Path<z.infer<TSchema>>;
  label?: string;
  placeholder?: string;
  description?: string;
  colSpan?: string;
  className?: string;
  options?: FieldOptions;
  show_if?: (values: z.infer<TSchema>) => boolean;
};
export interface TextFieldConfig<T extends z.ZodTypeAny>
  extends BaseFieldConfig<T> {
  field_type: "text" | "email" | "phone";
}
export interface PasswordFieldConfig<T extends z.ZodTypeAny>
  extends BaseFieldConfig<T> {
  field_type: "password";
  password_options?: {
    toggle?: boolean;
  };
}

export interface InternationalFieldConfig<T extends z.ZodTypeAny>
  extends BaseFieldConfig<T> {
  field_type: "phone";
  country?: string;
}
export interface TextareaFieldConfig<T extends z.ZodTypeAny>
  extends BaseFieldConfig<T> {
  field_type: "textarea";
}
export interface CheckboxFieldConfig<T extends z.ZodTypeAny>
  extends BaseFieldConfig<T> {
  field_type: "checkbox";
}
export interface RadioFieldConfig<T extends z.ZodTypeAny>
  extends BaseFieldConfig<T> {
  field_type: "radio";
  options_className?: string;
  radio_options: {
    value: string;
    label: string;
    className?: string;
  }[];
}
export interface SelectFieldConfig<T extends z.ZodTypeAny>
  extends BaseFieldConfig<T> {
  field_type: "select";
  options_className?: string;
  select_options: {
    value: string;
    label: string;
    className?: string;
  }[];
}
export interface MultiSelectFieldConfig<T extends z.ZodTypeAny>
  extends BaseFieldConfig<T> {
  field_type: "multi_select";
  subtype?: "normal" | "popover";
  options_className?: string;
  multi_select_options: {
    value: string;
    label: string;
    className?: string;
  }[];
}
export interface SingleDateFieldConfig<T extends z.ZodTypeAny>
  extends BaseFieldConfig<T> {
  field_type: "single_date";
  date_format?: string;
  disabled_date?: Matcher | Matcher[];
  date_config?: {
    locale?: string;
    timeZone?: string;
  };
  buttons?: {
    reset?: string;
    close?: string;
    confirm?: string;
  };
}

export interface RangeDateFieldConfig<T extends z.ZodTypeAny>
  extends BaseFieldConfig<T> {
  field_type: "range_date";
  date_format?: string;
  disabled_date?: Matcher | Matcher[];
  date_config?: {
    locale?: string;
    timeZone?: string;
  };
  buttons?: {
    reset?: string;
    close?: string;
    confirm?: string;
  };
}
export interface VariantFieldConfig<T extends z.ZodTypeAny>
  extends BaseFieldConfig<T> {
  field_type: "variants";
  buttons?: {
    add?: string;
    remove?: string;
  };
  variants: {
    name: string;
    label?: string;
    placeholder?: string;
    field_type: Omit<FieldTypes, "file" | "files">;
  }[];
}
export interface LocalizedFieldConfig<T extends z.ZodTypeAny>
  extends BaseFieldConfig<T> {
  field_type: "localized_text";
  locales?: string[];
}
export interface FileFieldConfig<T extends z.ZodTypeAny>
  extends BaseFieldConfig<T> {
  field_type: "file";
  image_options?: {
    accept?: string;
    maxSizeMb?: number;
    maxFiles?: 1;
  };
}

export interface FilesFieldConfig<T extends z.ZodTypeAny>
  extends BaseFieldConfig<T> {
  field_type: "files";
  image_options?: {
    accept?: string;
    multiple?: true;
    maxSizeMb?: number;
    maxFiles?: number;
    multiple_grid?: string;
  };
}
export interface RichTextFieldConfig<T extends z.ZodTypeAny>
  extends BaseFieldConfig<T> {
  field_type: "rich_text";
}

export type FieldConfig<T extends z.ZodTypeAny = z.ZodObject<any>> =
  | TextFieldConfig<T>
  | RichTextFieldConfig<T>
  | PasswordFieldConfig<T>
  | TextareaFieldConfig<T>
  | CheckboxFieldConfig<T>
  | RadioFieldConfig<T>
  | SelectFieldConfig<T>
  | MultiSelectFieldConfig<T>
  | SingleDateFieldConfig<T>
  | RangeDateFieldConfig<T>
  | VariantFieldConfig<T>
  | LocalizedFieldConfig<T>
  | FileFieldConfig<T>
  | FilesFieldConfig<T>;

export interface AutoFormProps<T extends z.ZodObject<any>> {
  schema: T;
  mode?: "onSubmit" | "onChange" | "onBlur" | "all" | "onTouched";
  is_dev?: boolean;
  fields: FieldConfig<T>[];
  defaultValues?: DefaultValues<z.infer<T>>;
  onSubmit: (values: z.infer<T>) => Promise<void> | void;
  className?: string;
  form_id?: string;
  buttons?: {
    className?: string;
    submit?: {
      text?: string;
      className?: string;
    };
    reset?: {
      text?: string;
      className?: string;
    };
  };
}

export type FormFieldProps = {
  controllerField: ControllerRenderProps<any, any>;
  fieldState: ControllerFieldState;
  field: FieldConfig;

  form_id?: string;
};

export type InternationalFieldProps = FormFieldProps & {
  country?: string;
};
