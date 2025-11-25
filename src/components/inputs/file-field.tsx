/* eslint-disable @typescript-eslint/no-unused-expressions */

import React from "react";
import type {
  FileFieldConfig,
  FilesFieldConfig,
  FormFieldProps,
} from "@/auto-form/types";
import { FieldError } from "@/components/ui/field";
import { cn } from "@/lib/utils";
import {
  FileIcon,
  FileImage,
  FileText,
  FileVideo,
  FileAudio,
  FileArchive,
  FileCode,
  FileSpreadsheet,
  X,
  Upload,
  Plus,
  Presentation,
} from "lucide-react";
import z from "zod";

// -----------------------------------------
// Types
// -----------------------------------------
interface StoredFile {
  file?: File;
  url: string;
  name: string;
  size: number;
  type: string;
  preview?: string;
  isURL?: boolean;
}

// -----------------------------------------
// File Type Icon Logic
// -----------------------------------------
function getFileTypeInfo(file: StoredFile) {
  const t = file.type.toLowerCase();

  if (t.startsWith("image/"))
    return { icon: FileImage, color: "text-blue-600", bg: "bg-blue-500/10" };
  if (t.startsWith("video/"))
    return {
      icon: FileVideo,
      color: "text-purple-600",
      bg: "bg-purple-500/10",
    };
  if (t.startsWith("audio/"))
    return { icon: FileAudio, color: "text-green-600", bg: "bg-green-500/10" };
  if (t === "application/pdf")
    return { icon: Presentation, color: "text-red-600", bg: "bg-red-500/10" };
  if (t.includes("word"))
    return { icon: FileText, color: "text-blue-600", bg: "bg-blue-500/10" };
  if (t.includes("spreadsheet") || t.includes("excel"))
    return {
      icon: FileSpreadsheet,
      color: "text-green-700",
      bg: "bg-green-600/10",
    };
  if (t.includes("presentation"))
    return {
      icon: Presentation,
      color: "text-orange-600",
      bg: "bg-orange-500/10",
    };
  if (t.includes("zip") || t.includes("compressed"))
    return {
      icon: FileArchive,
      color: "text-yellow-700",
      bg: "bg-yellow-600/10",
    };
  if (t.startsWith("text/") || t.includes("json"))
    return { icon: FileCode, color: "text-gray-600", bg: "bg-gray-500/10" };

  return { icon: FileIcon, color: "text-muted-foreground", bg: "bg-muted/20" };
}
type FileFieldProps<T extends z.ZodTypeAny> = {
  field: FileFieldConfig<T> | FilesFieldConfig<T>;
} & Omit<FormFieldProps, "field">;
// -----------------------------------------
// Component
// -----------------------------------------
function FileFieldComponent<T extends z.ZodTypeAny>({
  field,
  controllerField,
  fieldState,
  form_id,
}: FileFieldProps<T>) {
  const isMultiple = field.field_type === "files";
  const accept = field.image_options?.accept ?? "*";
  const maxSizeMb = field.image_options?.maxSizeMb ?? 10;
  const maxFiles = field.image_options?.maxFiles ?? 20;

  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setDragging] = React.useState(false);
  const [files, setFiles] = React.useState<StoredFile[]>([]);
  function urlToFile(value: unknown): StoredFile | null {
    // Case 1 — Null, undefined, or empty string
    if (value === null || value === undefined || value === "") {
      return null;
    }

    // Case 2 — Already a StoredFile
    if (
      typeof value === "object" &&
      value !== null &&
      "url" in value &&
      typeof (value as any).url === "string"
    ) {
      return value as StoredFile;
    }

    // Case 3 — File object
    if (value instanceof File) {
      const objUrl = URL.createObjectURL(value);
      return {
        file: value,
        url: objUrl,
        preview: value.type.startsWith("image/") ? objUrl : undefined,
        name: value.name,
        size: value.size,
        type: value.type,
        isURL: false,
      };
    }

    // Case 4 — String URL
    if (typeof value === "string") {
      const nameFromUrl = value.split("/").pop() || "file";
      return {
        url: value,
        name: nameFromUrl,
        size: 0,
        type: "",
        isURL: true,
      };
    }

    // Case 5 — Unknown or unsupported type
    console.warn("FileField: unexpected value for file input:", value);

    return {
      url: "",
      name: "unknown",
      size: 0,
      type: "",
      isURL: true,
    };
  }

  // -----------------------------------------
  // Initialize (server values)
  // -----------------------------------------
  React.useEffect(() => {
    const value = controllerField.value;

    if (value === null || value === undefined) {
      setFiles([]);
      return;
    }

    if (Array.isArray(value)) {
      const files = value
        .map(urlToFile)
        .filter((file): file is StoredFile => file !== null);
      setFiles(files);
    } else {
      const file = urlToFile(value);
      setFiles(file ? [file] : []);
    }
  }, [controllerField.value]);

  // -----------------------------------------
  // Add files
  // -----------------------------------------
  const addFiles = (fileList: FileList) => {
    const valid: StoredFile[] = [];

    Array.from(fileList).forEach((f) => {
      if (f.size > maxSizeMb * 1024 * 1024) {
        alert(`${f.name} exceeds ${maxSizeMb}MB`);
        return;
      }

      const fileObj: StoredFile = {
        file: f,
        url: URL.createObjectURL(f),
        preview: f.type.startsWith("image/")
          ? URL.createObjectURL(f)
          : undefined,
        name: f.name,
        size: f.size,
        type: f.type,
      };

      valid.push(fileObj);
    });

    const updated = isMultiple
      ? [...files, ...valid].slice(0, maxFiles)
      : valid.slice(0, 1);

    setFiles(updated);
    syncToForm(updated);
  };

  const syncToForm = (items: StoredFile[]) => {
    if (items.length === 0) {
      controllerField.onChange(isMultiple ? [] : null);
      return;
    }

    const realFiles = items
      .map((f) => f.file)
      .filter((f): f is File => f !== undefined);
    controllerField.onChange(isMultiple ? realFiles : realFiles[0] || null);
  };

  const removeFile = (idx: number) => {
    const updated = files.filter((_, i) => i !== idx);
    setFiles(updated);
    syncToForm(updated);

    // If this is a single file field, clear the input to allow re-selection of the same file
    if (!isMultiple && inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const openPicker = () => inputRef.current?.click();

  // -----------------------------------------
  // Memory cleanup
  // -----------------------------------------
  React.useEffect(() => {
    return () => {
      files.forEach((f) => {
        if (!f.isURL) {
          f.preview && URL.revokeObjectURL(f.preview);
          f.url && f.file && URL.revokeObjectURL(f.url);
        }
      });
    };
  }, [files]);

  // -----------------------------------------
  // Drag & Drop
  // -----------------------------------------
  const drag = (e: React.DragEvent, active = false) => {
    e.preventDefault();
    e.stopPropagation();
    setDragging(active);
  };

  const drop = (e: React.DragEvent) => {
    drag(e, false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  };

  // -----------------------------------------
  // Render
  // -----------------------------------------
  return (
    <div className="space-y-5">
      {/* Input */}
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept={accept}
        multiple={isMultiple}
        onChange={(e) => e.target.files && addFiles(e.target.files)}
      />

      {/* Upload Zone */}
      <div
        onClick={openPicker}
        onDrop={drop}
        onDragOver={(e) => drag(e, true)}
        onDragEnter={(e) => drag(e, true)}
        onDragLeave={(e) => drag(e, false)}
        className={cn(
          "relative rounded-xl border-2 border-dashed p-2 min-h-[220px] transition-all cursor-pointer select-none",
          isDragging
            ? "border-primary bg-primary/10 shadow-lg"
            : "border-muted-foreground/30 hover:border-primary/60 hover:bg-muted/40",
          files.length === 0 && "flex items-center justify-center"
        )}
        role="button"
        aria-label="Upload files"
      >
        {/* Empty state */}
        {files.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="rounded-full bg-muted p-6 mb-4">
              <Upload className="w-12 h-12 text-muted-foreground" />
            </div>
            <p className="text-lg font-medium text-foreground">
              {field.placeholder || "Drop files here or click to upload"}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {accept !== "*" && `${accept} · `}
              Max {maxSizeMb} MB per file
              {isMultiple && ` · Up to ${maxFiles} files`}
            </p>
          </div>
        )}

        {/* File Grid */}
        {files.length > 0 && (
          <div
            className={cn(
              "grid gap-4",
              isMultiple && field.image_options?.multiple_grid
                ? field.image_options?.multiple_grid
                : "grid-cols-1"
            )}
          >
            {files.map((file, i) => {
              const { icon: Icon, color, bg } = getFileTypeInfo(file);

              return (
                <div
                  key={i}
                  className="group relative aspect-square rounded-xl overflow-hidden border bg-card shadow-sm hover:shadow-lg transition-all cursor-pointer"
                >
                  {/* Thumbnails */}
                  {file.preview ||
                  (file.type.startsWith("image/") && file.url) ? (
                    <img
                      src={file.preview || file.url}
                      alt={file.name}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className=" flex items-center justify-center h-full gap-2">
                      <div className={cn("p-3 rounded-lg", bg)}>
                        <Icon className={cn("w-10 h-10", color)} />
                      </div>
                    </div>
                  )}

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(i);
                    }}
                    className="absolute top-2 right-2 bg-destructive text-destructive-foreground shadow p-2 rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-0 w-full bg-black/60 text-white text-xs px-2 py-1 truncate">
                    {file.name}
                    <br />
                    {file.size > 0 && (
                      <span className="ml-1 opacity-75">
                        {(file.size / 1024 / 1024).toFixed(1)} MB
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Add More */}
            {isMultiple && files.length < maxFiles && (
              <button
                type="button"
                onClick={openPicker}
                className="aspect-square rounded-xl border-2 border-dashed border-muted-foreground/40 flex flex-col items-center justify-center hover:border-primary hover:bg-muted/30 transition"
              >
                <Plus className="w-8 h-8 text-muted-foreground/60" />
              </button>
            )}
          </div>
        )}
      </div>

      <FieldError errors={[fieldState.error]} />
    </div>
  );
}

FileFieldComponent.displayName = "FileField";
export const FileField = React.memo(FileFieldComponent);
