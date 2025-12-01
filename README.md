# @taha-ui-dev/auto-form

### **Dynamic Form Builder for React & Next.js**

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
- ✔ **Rich text editor** with formatting options
- ✔ **Date range picker** with customizable locale and timezone
- ✔ **Password field** with toggle visibility
- ✔ **Shadcn-style** components included
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
npm install zod@^4.0.0
# or
pnpm add zod@^4.0.0
# or
yarn add zod@^4.0.0
```

---

## 🧩 Basic Usage

### **1. Create a Zod schema**

```ts
import { z } from "zod";

export const formSchema = z.object({
  // Basic fields
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.string().optional(),
  password: z.string().optional(),
  toggle_password: z.string().optional(),

  // Date fields
  single_date: z.string().optional(),
  range_date: z
    .object({
      from: z.string().optional(),
      to: z.string().optional(),
    })
    .optional(),

  // Selection fields
  select: z.string().optional(),
  multi_select: z.array(z.string()).optional(),
  radio: z.string().optional(),
  checkbox: z.boolean().optional(),

  // Rich content
  textarea: z.string().optional(),
  rich_text: z.string().optional(),

  // File uploads
  file: z.instanceof(File).optional(),
  files: z.array(z.instanceof(File)).max(10).optional(),

  // Advanced fields
  localized_text: z
    .object({
      en: z.string(),
      ar: z.string(),
    })
    .optional(),

  // Dynamic fields array
  variants: z
    .array(
      z.object({
        variant1: z.string().optional(),
        variant2: z.string().optional(),
      })
    )
    .optional(),
});

export type FormValues = z.infer<typeof formSchema>;
```

---

### **2. Define your fields**

```ts
import type { FieldConfig } from "@taha-ui-dev/auto-form";

export const formFields: FieldConfig[] = [
  // Basic text inputs
  {
    name: "name",
    label: "Full Name",
    field_type: "text",
    placeholder: "Enter your full name",
  },
  {
    name: "email",
    label: "Email",
    field_type: "text",
  },
  {
    name: "phone",
    label: "Phone Number",
    field_type: "phone",
  },

  // Password field
  {
    name: "password",
    label: "Password",
    field_type: "password",
  },

  // Selection fields
  {
    name: "select",
    label: "Select Option",
    field_type: "select",
    select_options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ],
  },
  {
    name: "multi_select",
    label: "Multi Select",
    field_type: "multi_select",
    options_className: "border-0",
    multi_select_options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ],
  },
  {
    name: "radio",
    label: "Radio Group",
    field_type: "radio",
    radio_options: [
      { value: "option1", label: "Option 1" },
      { value: "option2", label: "Option 2" },
    ],
  },
  {
    name: "checkbox",
    label: "Checkbox",
    field_type: "checkbox",
    options: {
      classes: {
        wrapper: "h-full flex items-center gap-2",
      },
    },
  },

  // Date fields
  {
    name: "single_date",
    label: "Single Date",
    field_type: "single_date",
  },
  {
    name: "range_date",
    label: "Date Range",
    field_type: "range_date",
    date_config: {
      locale: "en",
      timeZone: "Asia/Riyadh",
    },
  },

  // Rich content
  {
    name: "textarea",
    label: "Textarea",
    field_type: "textarea",
  },
  {
    name: "rich_text",
    label: "Rich Text",
    field_type: "rich_text",
    className: "col-span-2",
  },

  // File uploads
  {
    name: "file",
    label: "Single File Upload",
    field_type: "file",
    image_options: {
      accept: "image/*",
      maxSizeMb: 1,
      maxFiles: 1,
    },
  },
  {
    name: "files",
    label: "Multiple Files",
    field_type: "files",
    image_options: {
      multiple_grid: "grid-cols-2",
      accept: "image/*",
      multiple: true,
      maxSizeMb: 1,
      maxFiles: 10,
    },
  },

  // Advanced fields
  {
    name: "localized_text",
    label: "Localized Text",
    field_type: "localized_text",
  },

  // Dynamic fields array
  {
    name: "variants",
    label: "Product Variants",
    field_type: "variants",
    variants: [
      {
        name: "variant1",
        label: "Variant 1",
        field_type: "text",
      },
      {
        name: "variant2",
        label: "Variant 2",
        field_type: "text",
      },
    ],
  },
];
```

---

### **3. Use AutoForm**

```tsx
// Add this line at the top of your component if you are using Next.js
"use client";

import { AutoForm } from "@taha-ui-dev/auto-form";
import { formSchema, formFields, type FormValues } from "./form-config";

export default function ExampleForm() {
  const handleSubmit = async (values: FormValues) => {
    // Handle form submission
    console.log("Form submitted:", values);
    // Example: await api.submitForm(values);
  };

  // Set default values for controlled inputs
  const defaultValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    toggle_password: "",
    select: "",
    multi_select: [],
    checkbox: false,
    textarea: "",
    radio: "",
    single_date: "",
    range_date: { from: "", to: "" },
    variants: [],
    file: undefined,
    files: [],
    rich_text: "",
    localized_text: { en: "", ar: "" },
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Complete Form Example</h1>
      <AutoForm
        schema={formSchema}
        fields={formFields}
        defaultValues={defaultValues}
        onSubmit={handleSubmit}
        form_id="complete-form"
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      />
    </div>
  );
}
```

## 🎨 Styling

This package uses **Tailwind CSS** for styling. Make sure you have Tailwind CSS set up in your project. The components follow the **shadcn/ui** design system.

### Required CSS

Import the base styles in your application's main file:

```ts
@import "@taha-ui-dev/auto-form/style.css";
```

# 🧱 Supported Field Types

| Field Type       | Component             | Description                                                          |
| ---------------- | --------------------- | -------------------------------------------------------------------- |
| `text`           | Text input            | Standard text input field                                            |
| `password`       | Password input        | Password field with toggle visibility                                |
| `phone`          | Phone input           | Phone number input with international country selector               |
| `select`         | Dropdown/select       | Single selection dropdown                                            |
| `multi_select`   | Multi-select          | Multiple selection with checkboxes or chips                          |
| `radio`          | Radio group           | Radio button group for single selection                              |
| `checkbox`       | Checkbox              | Single checkbox or boolean toggle                                    |
| `textarea`       | Textarea              | Multi-line text input                                                |
| `rich_text`      | Rich text editor      | WYSIWYG editor with formatting options                               |
| `single_date`    | Date picker           | Single date selection with calendar                                  |
| `range_date`     | Date range picker     | Select a date range with start and end dates                         |
| `file`           | Single file upload    | File upload with preview and drag & drop                             |
| `files`          | Multiple file upload  | Multiple file upload with grid layout                                |
| `localized_text` | Localized text fields | Multiple language text inputs in a single field                      |
| `variants`       | Dynamic field array   | Repeatable group of fields for product variants or similar use cases |

---

# 📁 File Upload Fields

### Single File Upload

```ts
// Schema
gallery: z.instanceof(File).optional(),

// Default value
gallery: undefined,

// Field config
{
  name: "gallery",
  label: "Upload Image",
  field_type: "file",
  image_options: {
    accept: "image/*",
    maxSizeMb: 5,
    maxFiles: 1
  }
}
```

### Multiple Files Upload

```ts
// Schema
gallery: z.array(z.instanceof(File)).max(10).optional(),

// Default value
gallery: [],

// Field config
{
  name: "gallery",
  label: "Image Gallery",
  field_type: "files",
  image_options: {
    multiple_grid: "grid-cols-3 gap-4",  // Customize grid layout
    accept: "image/*",                   // Allowed file types
    multiple: true,                      // Allow multiple files
    maxSizeMb: 5,                        // Max file size in MB
    maxFiles: 10                         // Maximum number of files
  }
}
```

### File Upload Features

- **Drag & Drop**: Intuitive file upload interface
- **Image Previews**: Thumbnails for uploaded images
- **File Type Icons**: Automatic icons for different file types (PDF, DOC, ZIP, etc.)
- **Validation**:
  - File type restrictions (`accept` prop)
  - Maximum file size (`maxSizeMb`)
  - Maximum number of files (`maxFiles`)
- **Responsive Grid**: Customizable grid layout for multiple files
- **Preview & Remove**: Preview and remove individual files

---

# 🌍 Localized Fields

Create multi-language text inputs with a single field. The component automatically generates language tabs and handles the nested data structure.

### Basic Usage

```ts
// Schema
title: z.object({
  en: z.string(),
  ar: z.string()
}).optional(),

// Default values
{
  title: { en: "", ar: "" },
}

// Field config
{
  name: "title",
  label: "Title",
  field_type: "localized_text",
  locales: ["en", "ar"]  // Add more language codes as needed
}
```

### Features

- **Multiple Languages**: Support for any number of languages
- **Tabbed Interface**: Easy switching between language inputs
- **RTL Support**: Automatic text direction for RTL languages like Arabic
- **Consistent Data Structure**: Outputs a clean object with language codes as keys

### Example with Custom Labels

````ts
```ts
// Schema
description: z.string().optional(),

// Default value
{
  description: "",
}

// Field config
{
  name: "description",
  label: "Description",
  field_type: "rich_text",
  className: "min-h-[200px]"  // Set minimum height
}
````

### Features

- **Rich Text Formatting**: Bold, italic, headings, lists, quotes, and more
- **Media Support**: Embed images and videos
- **Code Blocks**: Syntax highlighting for code snippets
- **Tables**: Create and edit tables
- **Mentions & Hashtags**: Coming soon
- **Word Count**: Track content length
- **Auto-save**: Draft saving functionality

### Advanced Configuration

```ts
{
  name: "content",
  label: "Article Content",
  field_type: "rich_text",
  className: "min-h-[400px] border rounded-lg p-4",
  editorOptions: {
    placeholder: "Start writing your article here...",
    extensions: [
      // Add custom extensions
    ],
    onUpdate: (editor) => {
      // Handle editor updates
      console.log(editor.getHTML());
    }
  },
  // Character/word limit
  maxLength: 5000,
  showWordCount: true
}
```

### Validation Example

```ts
// Schema with validation
description: z
  .string()
  .min(50, "Description must be at least 50 characters")
  .max(5000, "Description cannot exceed 5000 characters"),
  // Conditional validation based on another field
  z.object({
    hasDescription: z.boolean(),
    description: z.string().superRefine((val, ctx) => {
      if (ctx.parent.hasDescription && !val) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Description is required when hasDescription is true",
        });
      }
    }),
  });
```

### Custom Styling

```css
/* Customize the rich text editor appearance */
.rich-text-editor {
  @apply border rounded-lg overflow-hidden;

  /* Toolbar */
  .ProseMirror-toolbar {
    @apply bg-gray-50 border-b p-2 flex flex-wrap gap-1;
  }

  /* Content area */
  .ProseMirror {
    @apply p-4 min-h-[200px] focus:outline-none;
  }

  /* Active button state */
  button.is-active {
    @apply bg-gray-200;
  }
}
```

### Extending Functionality

You can extend the rich text editor with additional Tiptap extensions:

```ts
import { Extension } from "@tiptap/core";
import { ReactRenderer } from "@tiptap/react";

export const CustomExtension = Extension.create({
  name: "customExtension",
  // Extension configuration
});

// Then use it in your field config
{
  field_type: "rich_text",
  extensions: [CustomExtension],
  // ...other options
}
```

---

# ✔ AutoForm Props

```ts
interface AutoFormProps<T extends z.ZodObject<any>> {
  schema: T;
  mode?: "onSubmit" | "onChange" | "onBlur" | "all" | "onTouched";
  is_dev?: boolean;
  fields: FieldConfig<T>[];
  defaultValues?: DefaultValues<z.infer<T>>;
  onSubmit: (values: z.infer<T>) => Promise<void> | void;
  className?: string;
  form_id?: string;
  buttons?: {
    className?: string;
    submit?: {
      text?: string;
      className?: string;
    };
    reset?: {
      text?: string;
      className?: string;
    };
  };
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
