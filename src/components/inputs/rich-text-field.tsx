import type { FormFieldProps, RichTextFieldConfig } from "@/auto-form/types";
import type { z } from "zod";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import React from "react";

interface RichTextProps<T extends z.ZodTypeAny>
  extends Omit<FormFieldProps, "field"> {
  field: RichTextFieldConfig<T>;
}

function RichTextFieldComponent<T extends z.ZodTypeAny>({
  controllerField,
  fieldState,
  field,
}: RichTextProps<T>) {
  return (
    <div className="w-full ">
      <SimpleEditor
        value={controllerField.value || ""}
        onChange={(html) => controllerField.onChange(html)}
      />

      {fieldState.error && (
        <p className="text-red-500 text-xs mt-1">{fieldState.error.message}</p>
      )}
    </div>
  );
}
RichTextFieldComponent.displayName = "RichTextField";
export const RichTextField = React.memo(RichTextFieldComponent);
