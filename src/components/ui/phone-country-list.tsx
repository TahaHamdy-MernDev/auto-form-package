import React, { forwardRef } from "react";
import * as RPNInput from "react-phone-number-input";
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "./command";
import { ScrollArea } from "./scroll-area";
import { CheckIcon } from "lucide-react";
import { FlagComponent } from "./phone-input";

interface CountryListProps {
  countryList: { label: string; value: RPNInput.Country | undefined }[];
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
  onSelectComplete: () => void;
}

const PhoneCountryList = forwardRef<HTMLDivElement, CountryListProps>(
  (
    {
      countryList,
      selectedCountry,
      onChange,
      onSelectComplete,
    }: CountryListProps,
    ref
  ) => {
    return (
      <CommandList>
        <ScrollArea ref={ref} className="h-72">
          <CommandEmpty>No country found.</CommandEmpty>
          <CommandGroup>
            {countryList.map(({ value, label }) =>
              value ? (
                <CommandItem
                  key={value}
                  className="gap-2"
                  onSelect={() => {
                    onChange(value);
                    onSelectComplete();
                  }}
                >
                  <FlagComponent country={value} countryName={label} />
                  <span className="flex-1 text-sm">{label}</span>
                  <span className="text-sm text-foreground/50">{`+${RPNInput.getCountryCallingCode(
                    value
                  )}`}</span>
                  <CheckIcon
                    className={`ml-auto size-4 ${
                      value === selectedCountry ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </CommandItem>
              ) : null
            )}
          </CommandGroup>
        </ScrollArea>
      </CommandList>
    );
  }
);

export default PhoneCountryList;
