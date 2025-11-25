import * as React from "react";
import { Phone } from "lucide-react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

import { Button } from "./button";
import { Command, CommandInput } from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
const LazyCountryList = React.lazy(() => import("./phone-country-list"));
import { cn } from "@/lib/utils";
import { InputGroup, InputGroupAddon, InputGroupInput } from "./input-group";
import { Spinner } from "./spinner";

type PhoneInputProps = Omit<
  React.ComponentProps<"input">,
  "onChange" | "value" | "ref"
> &
  Omit<RPNInput.Props<typeof RPNInput.default>, "onChange"> & {
    onChange?: (value: RPNInput.Value) => void;
  };

const PhoneField: React.ForwardRefExoticComponent<PhoneInputProps> =
  React.forwardRef<React.ElementRef<typeof RPNInput.default>, PhoneInputProps>(
    ({ className, onChange, value, ...props }, ref) => {
      return (
        <InputGroup className="w-full relative">
          <RPNInput.default
            ref={ref}
            className={cn("flex w-full rtl:pl-8 ltr:pr-8", className)}
            flagComponent={FlagComponent}
            countrySelectComponent={CountrySelect}
            inputComponent={InputComponent}
            smartCaret={true}
            value={value || undefined}
            /**
             * Handles the onChange event.
             *
             * react-phone-number-input might trigger the onChange event as undefined
             * when a valid phone number is not entered. To prevent this,
             * the value is coerced to an empty string.
             *
             * @param {E164Number | undefined} value - The entered value
             */

            onChange={(value) => onChange?.(value || ("" as RPNInput.Value))}
            {...props}
          />
          {/* <InputGroupAddon></InputGroupAddon> */}
          <InputGroupAddon>
            <Phone className="rtl:rotate-260 " />
          </InputGroupAddon>
        </InputGroup>
      );
    }
  );
PhoneField.displayName = "PhoneField";

const InputComponent = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input">
>(({ className, ...props }, ref) => (
  <InputGroupInput
    className={cn("w-full text-left flex-1", className)}
    {...props}
    ref={ref}
  />
));
InputComponent.displayName = "InputComponent";

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
}: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState<string | undefined>("");
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={(open) => {
        setIsOpen(open);
        if (open) setSearchValue("");
      }}
    >
      <PopoverTrigger className="flex items-center justify-center" asChild>
        <Button
          type="button"
          variant="outline"
          className="absolute h-full ltr:right-1 top-0 rtl:left-1 flex bg-transparent  border-0 shadow-none px-2 py-0  hover:bg-transparent focus:z-10 "
          disabled={disabled}
        >
          <FlagComponent
            country={selectedCountry}
            countryName={selectedCountry}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput
            value={searchValue}
            onValueChange={(value: React.SetStateAction<string>) => {
              setSearchValue(value);
              setTimeout(() => {
                if (scrollAreaRef.current) {
                  const viewportElement = scrollAreaRef.current.querySelector(
                    "[data-radix-scroll-area-viewport]"
                  );
                  if (viewportElement) {
                    viewportElement.scrollTop = 0;
                  }
                }
              }, 0);
            }}
            placeholder="Search country..."
          />

          <React.Suspense fallback={<Spinner className="m-4" />}>
            <LazyCountryList
              countryList={countryList}
              selectedCountry={selectedCountry}
              onChange={onChange}
              onSelectComplete={() => setIsOpen(false)}
              ref={scrollAreaRef}
            />
          </React.Suspense>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-7 overflow-hidden rounded-[2px]  [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneField, FlagComponent };
