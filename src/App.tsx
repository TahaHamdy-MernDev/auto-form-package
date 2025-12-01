// import { z } from "zod";
// import { FieldConfig } from "./types";
// import { AutoForm } from "./auto-form";
// import { generateDefaultsFromZod } from "./lib";

// const schema = z.object({
//   name: z.string().optional(),
//   email: z.string().optional(),
//   phone: z.string().optional(),
//   range_date: z
//     .object({ from: z.string().optional(), to: z.string().optional() })
//     .optional(),
//   variants: z
//     .array(
//       z.object({
//         variant1: z.string().optional(),
//         variant2: z.string().optional(),
//       })
//     )
//     .optional(),
//   password: z.string().optional(),
//   toggle_password: z.string().optional(),
//   localized_text: z.object({ en: z.string(), ar: z.string() }).optional(),
//   file: z.instanceof(File).optional(),
//   files: z.array(z.instanceof(File)).max(10).optional(),
//   select: z.string().optional(),
//   checkbox: z.boolean().optional(),
//   multi_select: z.array(z.string()).optional(),
//   textarea: z.string().optional(),
//   radio: z.string().optional(),
//   single_date: z.string().optional(),
//   rich_text: z.string().optional(),
// });

// const fields: FieldConfig[] = [
//   {
//     name: "name",
//     label: "name",
//     field_type: "text",
//   },
//   { name: "email", label: "email", field_type: "text" },
//   { name: "phone", label: "phone", field_type: "phone" },
//   {
//     name: "password",
//     label: "password",
//     field_type: "password",
//   },
//   {
//     name: "select",
//     label: "select",
//     field_type: "select",
//     select_options: [
//       { value: "option1", label: "Option 1" },
//       { value: "option2", label: "Option 2" },
//     ],
//   },
//   {
//     name: "localized_text",
//     label: "localized_text",
//     field_type: "localized_text",
//   },
//   {
//     name: "multi_select",
//     label: "multi_select",
//     field_type: "multi_select",
//     options_className: "border-0",
//     multi_select_options: [
//       { value: "option1", label: "Option 1" },
//       { value: "option2", label: "Option 2" },
//     ],
//   },

//   {
//     name: "checkbox",
//     label: "checkbox",
//     field_type: "checkbox",
//     options: {
//       classes: {
//         wrapper: "h-full flex items-center gap-2",
//       },
//     },
//   },

//   { name: "textarea", label: "textarea", field_type: "textarea" },
//   {
//     name: "radio",
//     label: "radio",
//     field_type: "radio",
//     radio_options: [
//       { value: "option1", label: "Option 1" },
//       { value: "option2", label: "Option 2" },
//     ],
//   },
//   { name: "single_date", label: "single_date", field_type: "single_date" },
//   {
//     name: "range_date",
//     label: "range_date",
//     field_type: "range_date",
//     date_config: { locale: "en", timeZone: "Asia/Riyadh" },
//   },
//   {
//     name: "variants",
//     label: "variants",
//     field_type: "variants",
//     variants: [
//       {
//         name: "variant1",
//         label: "Variant 1",
//         field_type: "text",
//       },
//       {
//         name: "variant2",
//         label: "Variant 2",
//         field_type: "text",
//       },
//     ],
//   },

//   {
//     name: "file",
//     label: "file",
//     field_type: "file",
//     image_options: {
//       accept: "image/*",
//       maxSizeMb: 1,
//       maxFiles: 1,
//     },
//   },
//   {
//     name: "files",
//     label: "files",
//     field_type: "files",
//     image_options: {
//       multiple_grid: "grid-cols-2",
//       accept: "image/*",
//       multiple: true,
//       maxSizeMb: 1,
//       maxFiles: 10,
//     },
//   },
//   {
//     name: "rich_text",
//     label: "rich_text",
//     field_type: "rich_text",
//     className: "col-span-2",
//   },
// ];
function App() {
  // const defaults = generateDefaultsFromZod(schema, {
  //   file: undefined,
  //   files: undefined,
  //   checkbox: false,
  // });
  // console.log("defaults", defaults);

  return (
    <div>
      <h1>AutoForm</h1>
    </div>
  );
  // <div className="container mx-auto p-2 ">
  //   <AutoForm
  //     className="max-w-full mx-auto border-0 grid grid-cols-3 gap-2"
  //     schema={schema}
  //     fields={fields}
  //     defaultValues={defaults}
  //     onSubmit={(data) => console.log(data)}
  //   />
  // </div>
}
export default App;
