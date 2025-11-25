import { FormFieldProps } from "@/auto-form/types";
import { FIELD_COMPONENTS } from "./field-registry";
import { ComponentType } from "react";

export function RenderField(props: FormFieldProps) {
  const Component = FIELD_COMPONENTS[
    props.field.field_type
  ] as ComponentType<any>;
  return <Component {...props} field={props.field} />;
};
