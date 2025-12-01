import {
  useFieldArray,
  useFormContext,
  Controller,
  FieldValues,
  Path,
  FieldArray,
} from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import { FieldLabel } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import { VariantFieldConfig, FormFieldProps, FieldConfig } from "@/types";
import type { z } from "zod";
import { RenderField } from "@/lib";
import React from "react";

type OutputType<T extends z.ZodTypeAny> = z.output<T>;
interface VariantFieldArrayProps<T extends z.ZodTypeAny>
  extends Omit<FormFieldProps, "field"> {
  field: VariantFieldConfig<T>;
}
function VariantFieldArrayComponent<T extends z.ZodTypeAny>({
  field,
  form_id,
}: VariantFieldArrayProps<T>) {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: field.name,
  });

  const subFields = field.variants || [];

  return (
    <div className="space-y-4">
      {fields.map((variant, index) => (
        <div key={variant.id} className="p-4 border rounded-lg bg-card">
          <div className="flex justify-between items-center pb-2">
            <FieldLabel>
              {field.label} #{index + 1}
            </FieldLabel>
            <Button
              type="button"
              size="sm"
              variant="destructive"
              onClick={() => remove(index)}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              {field.buttons?.remove || "Remove"}
            </Button>
          </div>

          <div
            className={cn(
              "grid gap-4",
              subFields.length > 2 ? "sm:grid-cols-2" : "sm:grid-cols-1"
            )}
          >
            {subFields.map((subField, subIdx) => {
              const fieldName =
                `${field.name}.${index}.${subField.name}` as const;

              return (
                <div key={subIdx}>
                  <Controller
                    name={fieldName}
                    control={control}
                    render={({ field: controllerField, fieldState }) => (
                      <>
                        <FieldLabel>{subField.label}</FieldLabel>
                        {RenderField({
                          field: subField as unknown as FieldConfig,
                          controllerField,
                          fieldState,
                          form_id,
                        })}
                      </>
                    )}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => {
          const newVariant = subFields.reduce<Record<string, unknown>>(
            (acc, subField) => ({
              ...acc,
              [subField.name]: subField.field_type === "number" ? 0 : "",
            }),
            {}
          ) as FieldArray<FieldValues, Path<OutputType<T>>>;
          append(newVariant);
        }}
        className="w-full"
      >
        <Plus className="w-4 h-4 mr-2" />
        {field.buttons?.add || "Add Variant"}
      </Button>
    </div>
  );
}

VariantFieldArrayComponent.displayName = "VariantFieldArray";
export const VariantFieldArray = React.memo(VariantFieldArrayComponent);
