import {
  Controller,
  useForm,
  type Resolver,
  type Path,
  FormProvider,
} from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import type { AutoFormProps, FieldConfig } from "./types";
import { cn, setServerErrors, RenderField } from "@/lib";

export function AutoForm<T extends z.ZodObject<any>>({
  schema,
  fields,
  defaultValues,
  onSubmit,
  form_id,
  className,
  buttons,
}: AutoFormProps<T>) {
  const form = useForm<z.infer<T>>({
    mode: "onSubmit",
    resolver: zodResolver(schema) as Resolver<z.infer<T>>,
    defaultValues,
  });

  async function handleOnSubmit(values: z.infer<T>) {
    try {
      await onSubmit(values);
    } catch (error: any) {
      // console.log(error);

      const maybeParsed =
        typeof error.message === "string"
          ? JSON.parse(error.message || "{}")
          : {};

      const errors =
        error.response?.data?.errors || maybeParsed.errors || undefined;

      if (errors) {
        setServerErrors(form, errors);
      } else {
        console.error("Unexpected error format:", error);
      }
    }
  }
  //log form errors
  console.log(form.formState.errors);
  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleOnSubmit)}
        className={cn(
          "space-y-4 max-w-md mx-auto p-6 rounded-lg border border-border",
          className
        )}
        autoComplete="off"
        id={form_id}
      >
        {fields
          .filter((f) => !f.show_if || f.show_if(form.watch()))
          .map((field: FieldConfig, idx: number) => {
            return (
              <div className={cn(field.className, field.colSpan)} key={idx}>
                <Controller
                  name={field.name as Path<z.infer<T>>}
                  control={form.control}
                  render={({ field: controllerField, fieldState }) => {
                    return (
                      <Field data-invalid={fieldState.invalid}>
                        {field.label && <FieldLabel>{field.label}</FieldLabel>}
                        {RenderField({
                          field,
                          controllerField,
                          fieldState,
                          form_id,
                        })}
                      </Field>
                    );
                  }}
                />
              </div>
            );
          })}
        <div className={cn("w-full", buttons?.className)}>
          <Button
            type="button"
            variant="outline"
            className={cn("w-full", buttons?.reset?.className)}
            onClick={() => form.reset()}
          >
            {buttons?.reset?.text || "Reset"}
          </Button>
          <Button
            type="submit"
            className={cn("w-full", buttons?.submit?.className)}
          >
            {buttons?.submit?.text || "Submit"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
