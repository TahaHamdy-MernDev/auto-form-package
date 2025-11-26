# @taha-ui-dev/auto-form

<div align="center">
  <h1>✨ AutoForm</h1>
  <h3>Dynamic, Type-Safe Form Builder for React</h3>
  
  <p align="center">
    <a href="https://www.npmjs.com/package/@taha-ui-dev/auto-form">
      <img src="https://img.shields.io/npm/v/@taha-ui-dev/auto-form.svg?style=flat-square" alt="npm version" />
    </a>
    <a href="https://bundlephobia.com/package/@taha-ui-dev/auto-form">
      <img src="https://img.shields.io/bundlephobia/minzip/@taha-ui-dev/auto-form" alt="bundle size" />
    </a>
    <a href="https://github.com/TahaHamdy-MernDev/auto-form-package/actions">
      <img src="https://img.shields.io/github/actions/workflow/status/TahaHamdy-MernDev/auto-form-package/ci.yml?branch=main" alt="build status" />
    </a>
    <a href="https://github.com/TahaHamdy-MernDev/auto-form-package/blob/main/LICENSE">
      <img src="https://img.shields.io/npm/l/@taha-ui-dev/auto-form" alt="license" />
    </a>
  </p>

  <p>
    <strong>AutoForm</strong> is a powerful, type-safe form builder for React that combines React Hook Form, Zod validation, and shadcn/ui components.
    Create beautiful, accessible, and performant forms with minimal boilerplate and maximum type safety.
  </p>

  <div align="center">
    <img src="https://i.imgur.com/example-preview.png" alt="AutoForm Preview" width="800" />
  </div>
</div>

## ✨ Features

- 🚀 **Type-Safe Forms** - Built with TypeScript and Zod for end-to-end type safety
- 🎨 **Beautiful UI** - Styled with shadcn/ui and Tailwind CSS
- ♿ **Accessible** - Follows WAI-ARIA design patterns
- 🛠 **Customizable** - Extend and style to match your design system
- 📦 **Lightweight** - Small bundle size with minimal dependencies
- ⚡ **Developer Experience** - Excellent TypeScript support and IntelliSense
- 🔄 **Form State Management** - Built on React Hook Form for optimal performance
- 🌐 **Localization** - Built-in support for multiple languages
- 📱 **Responsive** - Works on all screen sizes
- 🎯 **Validation** - Powered by Zod for powerful validation rules

## � Installation

```bash
# npm
npm install @taha-ui-dev/auto-form

# yarn
yarn add @taha-ui-dev/auto-form

# pnpm
pnpm add @taha-ui-dev/auto-form
```

### Peer Dependencies

AutoForm requires these peer dependencies. Install them in your project:

```bash
npm install react@>=18.0.0 react-dom@>=18.0.0 react-hook-form@^7.0.0 zod@^4.0.0 date-fns@^4.0.0 date-fns-tz@^3.0.0 react-day-picker@^9.0.0 react-phone-number-input@^3.0.0 tailwindcss@^4.0.0
```

### TypeScript Support

AutoForm includes TypeScript type definitions out of the box - no additional types package needed!

## ⚡ Quick Start

Create your first form in minutes with AutoForm:

## Installation

```bash
npm install @taha-ui-dev/auto-form
```

## Peer Dependencies

Make sure you have these peer dependencies installed:

```bash
npm install react@>=18.0.0 react-dom@>=18.0.0 react-hook-form@^7.0.0 zod@^4.0.0 date-fns@^4.0.0 date-fns-tz@^3.0.0 react-day-picker@^9.0.0 react-phone-number-input@^3.0.0
```

## 🚀 Basic Usage

```tsx
import { z } from "zod";
import { AutoForm } from "@taha-ui-dev/auto-form";

// Define your form schema using Zod
const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function MyForm() {
  const handleSubmit = async (values) => {
    console.log("Form submitted:", values);
    // Handle form submission
  };

  return (
    <AutoForm
      schema={formSchema}
      onSubmit={handleSubmit}
      fields={[
        { name: "username", field_type: "text", label: "Username" },
        { name: "email", field_type: "email", label: "Email" },
        {
          name: "password",
          field_type: "password",
          label: "Password",
          options: {
            password_options: {
              toggle: true,
            },
          },
        },
      ]}
    />
  );
}
```

## � Field Types

AutoForm supports a wide range of field types out of the box. Here are some examples:

### ✏️ Text Input

```tsx
{
  name: "username",
  field_type: "text",
  label: "Username",
  placeholder: "Enter your username",
  description: "Choose a unique username",
  options: {
    disabled: false,
    autoFocus: true,
    addons: {
      left: <UserIcon className="w-4 h-4 text-muted-foreground" />,
      right: <InfoIcon className="w-4 h-4 text-muted-foreground" />
    },
    classes: {
      input: "pl-8" // Add padding for the left icon
    }
  }
}
```

### 🔑 Password Input

```tsx
{
  name: "password",
  field_type: "password",
  label: "Password",
  description: "Must be at least 8 characters long",
  options: {
    password_options: {
      toggle: true // Shows show/hide password toggle
    },
    icons: {
      show: <Eye className="w-4 h-4" />,
      hide: <EyeOff className="w-4 h-4" />
    },
    tooltip: "Your password must be at least 8 characters long"
  }
}
```

### 📋 Select Dropdown

```tsx
{
  name: "country",
  field_type: "select",
  label: "Country",
  placeholder: "Select a country...",
  description: "Select your country of residence",
  select_options: [
    {
      value: "us",
      label: "United States",
      className: "flex items-center gap-2"
    },
    {
      value: "ca",
      label: "Canada",
      className: "flex items-center gap-2"
    },
    {
      value: "uk",
      label: "United Kingdom",
      className: "flex items-center gap-2"
    }
  ],
  options: {
    icons: {
      right: <ChevronDown className="w-4 h-4 opacity-50" />
    }
  }
}
```

### ☑️ Checkbox

```tsx
{
  name: "terms",
  field_type: "checkbox",
  label: "I agree to the terms and conditions",
  description: "You must accept the terms and conditions to continue",
  options: {
    className: "items-start"
  }
}
```

### 🔘 Radio Buttons

```tsx
{
  name: "notification_preference",
  field_type: "radio",
  label: "Notification Preference",
  description: "How would you like to receive notifications?",
  options_className: "space-y-2",
  radio_options: [
    {
      value: "email",
      label: "Email",
      description: "Get notifications via email"
    },
    {
      value: "sms",
      label: "SMS",
      description: "Get notifications via text message"
    },
    {
      value: "none",
      label: "No notifications",
      description: "I don't want to receive any notifications"
    }
  ]
}
```

### 📅 Date Picker

```tsx
{
  name: "birth_date",
  field_type: "single_date",
  label: "Date of Birth",
  description: "Select your date of birth",
  placeholder: "Pick a date",
  date_format: "MMMM d, yyyy",
  disabled_date: [
    { from: new Date(), to: new Date(2099, 12, 31) },
    { before: new Date(1900, 1, 1) }
  ],
  options: {
    icons: {
      right: <CalendarIcon className="w-4 h-4 opacity-50" />
    }
  }
}
```

### 📎 File Upload

```tsx
{
  name: "profile_picture",
  field_type: "file",
  label: "Profile Picture",
  description: "Upload a profile picture (max 2MB)",
  image_options: {
    accept: "image/png, image/jpeg, image/jpg",
    maxSizeMb: 2,
    multiple: false
  },
  options: {
    className: "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-accent/50 transition-colors"
  }
}
```

### ✍️ Rich Text Editor

```tsx
{
  name: "bio",
  field_type: "rich_text",
  label: "Biography",
  description: "Tell us about yourself, your experience, and your interests",
  options: {
    placeholder: "Start writing here...",
    minHeight: "200px",
    toolbar: true,
    classes: {
      wrapper: "rounded-lg border border-input",
      editor: "prose dark:prose-invert max-w-none p-4",
      toolbar: "border-b border-input bg-muted p-2"
    }
  }
}
```

## � Conditional Fields

Show/hide fields based on form values:

```typescript
{
  name: "company_name",
  field_type: "text",
  label: "Company Name",
  show_if: (values) => values.user_type === "business"
}
```

## 🖥️ Form Layout

Control the layout using the `colSpan` and `className` properties:

```typescript
{
  name: "first_name",
  field_type: "text",
  label: "First Name",
  colSpan: "col-span-6" // Use Tailwind classes for responsive layout
}
```

## 🔒 Form Validation

AutoForm uses Zod for validation. Define your validation schema:

```typescript
const formSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be less than 20 characters"),
  email: z.string().email("Please enter a valid email"),
  age: z.number().min(18, "You must be at least 18 years old"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});
```

## ⚡ Server-Side Validation

Handle server-side validation errors:

```typescript
import { setServerErrors } from "@taha-ui-dev/auto-form";

const handleSubmit = async (values, form) => {
  try {
    // Your API call
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      const errorData = await response.json();

      // Format 1: Direct error object
      if (errorData.errors) {
        setServerErrors(form, errorData.errors);
        return;
      }

      // Format 2: Error message with JSON string
      if (typeof errorData.message === "string") {
        try {
          const parsedError = JSON.parse(errorData.message);
          if (parsedError.errors) {
            setServerErrors(form, parsedError.errors);
            return;
          }
        } catch (e) {
          // Not a JSON string, handle as generic error
          throw new Error(errorData.message || "An error occurred");
        }
      }

      throw new Error(errorData.message || "An error occurred");
    }

    // Handle successful submission
    return await response.json();
  } catch (error) {
    // Handle unexpected errors
    console.error("Submission error:", error);
    throw error;
  }
};

// In your component
<AutoForm
  // ...other props
  onSubmit={async (values) => {
    try {
      await handleSubmit(values, form);
      // Show success message
      toast.success("Form submitted successfully!");
    } catch (error) {
      // Handle errors not caught by setServerErrors
      toast.error(error.message || "An error occurred");
    }
  }}
/>;
```

## 🎨 Custom Styling

AutoForm is built with Tailwind CSS and follows shadcn/ui design principles. You can customize the styling using the `className` prop:

```tsx
<AutoForm
  className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow"
  // ...other props
/>
```

## � Localization

Support for localized text inputs:

```typescript
{
  name: "title",
  field_type: "localized_text",
  label: "Title",
  locales: ["en", "fr", "es"]
}
```

## 🔄 Dynamic Variants

Create dynamic arrays of fields:

```typescript
{
  name: "variants",
  field_type: "variants",
  label: "Product Variants",
  variants: [
    { name: "color", label: "Color", field_type: "text" },
    { name: "size", label: "Size", field_type: "select", select_options: [
      { value: "s", label: "Small" },
      { value: "m", label: "Medium" },
      { value: "l", label: "Large" }
    ]}
  ]
}
```

## 📚 API Reference

### AutoForm Props

| Prop            | Type                        | Required | Description                         |
| --------------- | --------------------------- | -------- | ----------------------------------- | ----------------------- |
| `schema`        | `z.ZodObject`               | Yes      | Zod schema for form validation      |
| `fields`        | `FieldConfig[]`             | Yes      | Array of field configurations       |
| `onSubmit`      | `(values) => Promise<void>  | void`    | Yes                                 | Form submission handler |
| `defaultValues` | `DefaultValues<z.infer<T>>` | No       | Default form values                 |
| `className`     | `string`                    | No       | Additional CSS classes for the form |
| `form_id`       | `string`                    | No       | ID for the form element             |

### Field Configuration

Common field properties:

| Property      | Type                  | Description                                |
| ------------- | --------------------- | ------------------------------------------ |
| `name`        | `string`              | Field name (must match schema)             |
| `field_type`  | `FieldTypes`          | Type of the field (e.g., "text", "select") |
| `label`       | `string`              | Field label                                |
| `placeholder` | `string`              | Field placeholder text                     |
| `description` | `string`              | Help text below the field                  |
| `className`   | `string`              | Additional CSS classes                     |
| `colSpan`     | `string`              | Grid column span (e.g., "col-span-6")      |
| `show_if`     | `(values) => boolean` | Condition to show/hide the field           |
| `options`     | `FieldOptions`        | Additional field options                   |

## � Examples

### 🔐 Login Form

```tsx
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember_me: z.boolean().optional(),
});

<AutoForm
  schema={loginSchema}
  onSubmit={handleLogin}
  fields={[
    {
      name: "email",
      field_type: "email",
      label: "Email",
      placeholder: "your@email.com",
    },
    {
      name: "password",
      field_type: "password",
      label: "Password",
      options: {
        password_options: { toggle: true },
      },
    },
    {
      name: "remember_me",
      field_type: "checkbox",
      label: "Remember me",
    },
  ]}
/>;
```

### Registration Form

```tsx
const registerSchema = z
  .object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

<AutoForm
  schema={registerSchema}
  onSubmit={handleRegister}
  fields={[
    {
      name: "name",
      field_type: "text",
      label: "Full Name",
      colSpan: "col-span-2",
    },
    {
      name: "email",
      field_type: "email",
      label: "Email",
      colSpan: "col-span-2",
    },
    {
      name: "password",
      field_type: "password",
      label: "Password",
      colSpan: "col-span-1",
    },
    {
      name: "confirm_password",
      field_type: "password",
      label: "Confirm Password",
      colSpan: "col-span-1",
    },
  ]}
/>;
```

## 🔧 Troubleshooting

### Common Issues

1. **Field not updating**: Ensure your field name matches the schema exactly.
2. **Validation not working**: Make sure your Zod schema is properly defined.
3. **Form not submitting**: Check your `onSubmit` handler for errors.
4. **Styling issues**: Ensure Tailwind CSS is properly set up in your project.

## 📄 License

MIT © [Taha Hamdy](https://github.com/TahaHamdy-MernDev)

## 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check [issues page](https://github.com/TahaHamdy-MernDev/auto-form-package/issues).

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## ⭐️ Show Your Support

Give a ⭐️ if this project helped you!

## 📝 License

This project is [MIT](https://github.com/TahaHamdy-MernDev/auto-form-package/blob/main/LICENSE) licensed.

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/TahaHamdy-MernDev">Taha Hamdy</a>
</div>
