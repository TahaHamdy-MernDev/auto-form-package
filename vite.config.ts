import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig(({ mode }) => {
  const isProd = mode === "production";

  return {
    plugins: [
      react(),
      tailwindcss(),
      dts({
        insertTypesEntry: true,
        outDir: "dist",
      }),
      mode === "analyze" &&
        visualizer({
          open: true,
        }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "AutoForm",
        formats: ["es", "cjs"],
        fileName: (f) => `auto-form.${f}.js`,
      },
      sourcemap: false,
      minify: isProd ? "esbuild" : false,
      rollupOptions: {
        external: [
          "react",
          "react-dom",
          "react/jsx-runtime",
          "react-hook-form",
          "zod",
          "date-fns",
          "date-fns-tz",
          "react-day-picker",
          "react-phone-number-input",
          /^@radix-ui\/.*/,
          /^@tiptap\/.*/,
          "class-variance-authority",
          "clsx",
          "tailwind-merge",
        ],
      },
    },
  };
});
