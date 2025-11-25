/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { FieldContent, FieldError } from "@/components/ui/field";
import type { FormFieldProps, LocalizedFieldConfig } from "@/auto-form/types";
import type { z } from "zod";

interface LocalizedFieldProps<T extends z.ZodTypeAny>
  extends Omit<FormFieldProps, "field"> {
  field: LocalizedFieldConfig<T>;
}
function LocalizedFieldComponent<T extends z.ZodTypeAny>({
  field,
  form_id,
}: LocalizedFieldProps<T>) {
  const { control, formState } = useFormContext();
  const locales = field.locales || ["en", "ar"];

  return (
    <FieldContent className="grid sm:grid-cols-2 gap-3">
      {locales.map((locale) => {
        const localizedName = `${field.name}.${locale}` as const;
        const localizedError = (formState.errors as any)?.[field.name]?.[
          locale
        ];

        return (
          <Controller
            key={locale}
            name={localizedName}
            control={control}
            render={({ field: controllerField }) => (
              <div>
                <InputGroup>
                  <InputGroupInput
                    {...controllerField}
                    id={`${form_id}-${localizedName}`}
                    placeholder={field.placeholder}
                    aria-invalid={!!localizedError}
                  />
                  <InputGroupAddon>{locale.toUpperCase()}</InputGroupAddon>
                </InputGroup>
                <FieldError errors={[localizedError]} />
              </div>
            )}
          />
        );
      })}
    </FieldContent>
  );
}

LocalizedFieldComponent.displayName = "LocalizedField";
export const LocalizedField = React.memo(LocalizedFieldComponent);
