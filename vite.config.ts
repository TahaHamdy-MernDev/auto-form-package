import path from "path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";
import { defineConfig } from "vite";
import { visualizer } from "rollup-plugin-visualizer";
import type { PluginOption } from "vite";

export default defineConfig(({ mode }) => {
  const plugins: PluginOption[] = [
    react(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
      outDir: "dist",
    }),
  ];

  if (mode === "analyze") {
    plugins.push(
      visualizer({
        open: true,
        filename: "bundle-analyzer-report.html",
        gzipSize: true,
        brotliSize: true,
      }) as PluginOption
    );
  }

  return {
    plugins,
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
        fileName: (format) =>
          `auto-form.${format === "es" ? "es.js" : "cjs.js"}`,
      },
      sourcemap: true,
      minify: mode === "production" ? "esbuild" : false,
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
          "tailwindcss",
          /^@radix-ui\/.*/,
          /^@tiptap\/.*/,
          "class-variance-authority",
          "clsx",
          "tailwind-merge",
        ],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react/jsx-runtime": "jsxRuntime",
          },
        },
      },
    },
  };
});
