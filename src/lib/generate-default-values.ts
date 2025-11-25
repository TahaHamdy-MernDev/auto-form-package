import { z } from "zod";
import type { DefaultValues } from "react-hook-form";

export function generateDefaultsFromZod<T extends z.ZodObject<any>>(
  schema: T,
  overrides?: Partial<z.infer<T>>
): DefaultValues<z.infer<T>> {
  const shape = schema.shape;
  const out: Record<string, any> = {};

  for (const [key, value] of Object.entries(shape) as [
    string,
    z.ZodTypeAny
  ][]) {
    out[key] = resolveDefault(value);
  }

  return { ...out, ...overrides } as DefaultValues<z.infer<T>>;
}
function resolveDefault(schema: z.ZodTypeAny): any {
  if ("_def" in schema) {
    const def = (schema as any)._def;

    // Handle ZodOptional and ZodNullable
    if (def.innerType) {
      return resolveDefault(def.innerType);
    }

    // Handle ZodDefault
    if (def.defaultValue !== undefined) {
      return def.defaultValue;
    }
  }

  // Handle primitive types
  if (schema instanceof z.ZodString) return "";
  if (schema instanceof z.ZodNumber) return 0;
  if (schema instanceof z.ZodBoolean) return false;
  if (schema instanceof z.ZodArray) return [];
  if (schema instanceof z.ZodDate) return "";
  if (schema instanceof z.ZodLiteral) return schema.value;

  // Handle objects
  if (schema instanceof z.ZodObject) {
    const shape = schema.shape;
    const keys = Object.keys(shape);

    // Special case for date range
    if (keys.includes("from") && keys.includes("to")) {
      return { from: "", to: "" };
    }

    // Special case for localized fields
    if (keys.every((k) => ["en", "ar", "fr", "de"].includes(k))) {
      return Object.fromEntries(keys.map((k) => [k, ""]));
    }

    // General object case
    return Object.fromEntries(
      Object.entries(shape).map(([key, value]) => [
        key,
        resolveDefault(value as z.ZodTypeAny),
      ])
    );
  }

  // Handle unions (take first non-undefined/non-null type)
  if (schema instanceof z.ZodUnion) {
    const options = (schema as any)._def.options as z.ZodTypeAny[];
    const nonNullOptions = options.filter(
      (opt) => !(opt instanceof z.ZodUndefined) && !(opt instanceof z.ZodNull)
    );
    if (nonNullOptions.length > 0) {
      return resolveDefault(nonNullOptions[0]);
    }
  }

  // Default fallback
  return "";
}
