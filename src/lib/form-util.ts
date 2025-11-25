import type { FieldValues, UseFormReturn, Path } from "react-hook-form";

export function setServerErrors<T extends FieldValues>(
  form: UseFormReturn<T>,
  errors: Partial<Record<Path<T> | `root.${string}` | "root", string>>
) {
  (
    Object.entries(errors) as [Path<T> | `root.${string}` | "root", string][]
  ).forEach(([key, message]) => {
    if (!message) return;
    form.setError(key, {
      type: "server",
      message,
    });
  });
}
