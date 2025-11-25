// Main form components
export { AutoForm } from "./auto-form/form";

// Field components
export * from "./components/inputs";

// Types
export type { FormFieldProps, FieldConfig } from "./auto-form/types";

// Utilities
export { generateDefaultsFromZod } from "./lib";

// Field registry and renderer
export { FIELD_COMPONENTS } from "./lib/field-registry";
export { RenderField } from "./lib/render-field";

// Re-export useful types from dependencies
export type { z } from "zod";
export type { ControllerRenderProps, UseFormReturn } from "react-hook-form";
