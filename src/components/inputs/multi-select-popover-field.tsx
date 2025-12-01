import React from "react";
import type { FormFieldProps, MultiSelectFieldConfig } from "@/types";
import { cn } from "@/lib/utils";
import { FieldError } from "@/components/ui/field";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown } from "lucide-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandInput,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command";
import type { z } from "zod";
interface MultiSelectPopoverProps<T extends z.ZodTypeAny>
  extends Omit<FormFieldProps, "field"> {
  field: MultiSelectFieldConfig<T>;
}
function MultiSelectPopoverFieldComponent<T extends z.ZodTypeAny>({
  field,
  controllerField,
  fieldState,
}: MultiSelectPopoverProps<T>) {
  const selectedValues: string[] = controllerField.value || [];
  const [open, setOpen] = React.useState(false);

  const toggleValue = (value: string) => {
    if (selectedValues.includes(value)) {
      controllerField.onChange(selectedValues.filter((v) => v !== value));
    } else {
      controllerField.onChange([...selectedValues, value]);
    }
  };

  const displayText =
    selectedValues.length > 0
      ? selectedValues
          .map(
            (v) => field.multi_select_options?.find((o) => o.value === v)?.label
          )
          .join(", ")
      : field.placeholder;

  return (
    <div className="space-y-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            type="button"
            className={cn(
              "w-full justify-between",
              fieldState.invalid && "border-destructive"
            )}
          >
            {displayText}
            <ChevronsUpDown className="w-4 h-4 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder={field.placeholder} />
            <CommandList>
              <CommandEmpty>{field.placeholder}</CommandEmpty>

              <CommandGroup>
                {field.multi_select_options?.map((option) => {
                  const checked = selectedValues.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleValue(option.value)}
                      className="cursor-pointer"
                    >
                      <Checkbox checked={checked} className="mr-2" />
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <FieldError errors={[fieldState.error]} />
    </div>
  );
}

MultiSelectPopoverFieldComponent.displayName = "MultiSelectPopoverField";
export const MultiSelectPopoverField = React.memo(
  MultiSelectPopoverFieldComponent
);
