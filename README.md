# 📦 @taha-ui-dev/auto-form

### **Dynamic Form Builder for React**

Built with **React Hook Form**, **Zod**, and **shadcn-style UI components** — all bundled and ready to use.

Create complex, fully validated forms using a **single schema + config object** with zero boilerplate.

---

## 🚀 Features

- ✔ Automatic form generation (schema + config-only)
- ✔ Built on **React Hook Form**
- ✔ **Zod** validation included
- ✔ All common fields included (text, select, radio, date, file upload…)
- ✔ **File upload** with preview, drag & drop, multi-file support
- ✔ **Multi-select** (normal + popover)
- ✔ **Localized fields** (e.g., `en`, `ar`)
- ✔ **Dynamic variant builder** (field arrays)
- ✔ **Shadcn-style** components included (no extra setup)
- ✔ Optimized & fully typed for **TypeScript**

---

## 📥 Installation

```bash
npm install @taha-ui-dev/auto-form@latest
# or
pnpm add @taha-ui-dev/auto-form@latest
# or
yarn add @taha-ui-dev/auto-form@latest
```

### Peer Dependencies

Make sure you have these peer dependencies installed:

```bash
npm install react@^18.0.0 react-dom@^18.0.0 react-hook-form@^7.0.0 zod@^4.0.0
# or
pnpm add react@^18.0.0 react-dom@^18.0.0 react-hook-form@^7.0.0 zod@^4.0.0
# or
yarn add react@^18.0.0 react-dom@^18.0.0 react-hook-form@^7.0.0 zod@^4.0.0
```

---

## 🧩 Basic Usage

### **1. Create a Zod schema**

```ts
import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().optional(),
  date: z.date().optional(),
});

export type FormValues = z.infer<typeof formSchema>;
```

---

### **2. Define your fields**

```ts
import type { FieldConfig } from "@taha-ui-dev/auto-form";

export const formFields: FieldConfig[] = [
  {
    name: "name",
    label: "Full Name",
    field_type: "text",
    placeholder: "Enter your full name",
  },
  {
    name: "email",
    label: "Email Address",
    field_type: "email",
    description: "We'll never share your email with anyone else.",
  },
  {
    name: "phone",
    label: "Phone Number",
    field_type: "phone",
    optional: true,
  },
  {
    name: "date",
    label: "Appointment Date",
    field_type: "single_date",
    optional: true,
  },
];
```

---

### **3. Use AutoForm**

```tsx
"use client";

import { AutoForm } from "@taha-ui-dev/auto-form";
import { formSchema, formFields, type FormValues } from "./form-config";

export default function ExampleForm() {
  const handleSubmit = async (values: FormValues) => {
    // Handle form submission
    console.log("Form submitted:", values);
    // Example: await api.submitForm(values);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Contact Us</h1>
      <AutoForm
        schema={formSchema}
        fields={formFields}
        onSubmit={handleSubmit}
        form_id="contact-form"
        className="space-y-6"
      />
    </div>
  );
}
```

## 🎨 Styling

This package uses **Tailwind CSS** for styling. Make sure you have Tailwind CSS set up in your project. The components follow the **shadcn/ui** design system.

### Required CSS

Import the base styles in your application's main CSS file:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import "@taha-ui-dev/auto-form/style.css";
```

## 📦 Development

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Development Server

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

## 📝 License

MIT

---

# 🧱 Supported Field Types

| Field Type     | Component                               |
| -------------- | --------------------------------------- |
| text           | Text input                              |
| password       | Password input                          |
| phone          | Phone input with country selector       |
| select         | Dropdown/select                         |
| radio          | Radio group                             |
| checkbox       | Checkbox                                |
| textarea       | Textarea                                |
| single_date    | Date picker                             |
| range_date     | Date range picker                       |
| file           | Single file upload                      |
| files          | Multiple file upload                    |
| multi_select   | Multi-select (normal & popover)         |
| localized_text | Multi-locale text fields                |
| variants       | Dynamic field array (repeatable groups) |

---

# 📁 File Upload Field

Supports:

- Drag & drop
- Image previews
- Multi-file mode
- Auto file icons (PDF, ZIP, DOCX, images, etc.)
- File size limits
- Accept filters (`image/*`, `.pdf`, etc.)

**Example:**

```ts
{
  name: "gallery",
  label: "Gallery",
  field_type: "files",
  image_options: {
    accept: "image/*",
    maxSizeMb: 5,
    maxFiles: 10
  }
}
```

---

# 🌍 Localized Fields

```ts
{
  name: "title",
  label: "title",
  field_type: "localized_text",
  locales: ["en", "ar"]
}
```

Creates fields:

- `title.en`
- `title.ar`

---

# 🔁 Dynamic Variant Builder

```ts
{
  name: "variants",
  label: "variant",
  field_type: "variants",
  variants: [
    { name: "size", label: "size", field_type: "text" },
    { name: "color", label: "color", field_type: "text" }
  ]
}
```

Produces an interactive "Add Variant" UI.

---

# ✔ AutoForm Props

```ts
interface AutoFormProps<T extends ZodObject> {
  schema: T;
  fields: FieldConfig[];
  defaultValues?: DefaultValues<z.infer<T>>;
  onSubmit: (values: z.infer<T>) => void | Promise<void>;
  form_id?: string;
  className?: string;
}
```

---

# 🎨 Styling

This package ships with lightweight **shadcn-style components**, including:

- Button
- Input
- Select
- Popover
- Radio
- Checkbox
- Calendar
- Separator
- Textarea
- ScrollArea
- Spinner
- Input Group

You **do not** need to install shadcn/ui.

---

# 📦 Bundle Output

This library generates:

| Format | File                    |
| ------ | ----------------------- |
| ES     | `dist/auto-form.es.js`  |
| CJS    | `dist/auto-form.cjs.js` |
| Types  | `dist/index.d.ts`       |

---

# 🤝 Contributing

PRs and feedback are welcome.

---

# 📝 License

MIT © Taha
