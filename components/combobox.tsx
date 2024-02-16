"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

//@ts-ignore
export function Combobox({ value, setValue }) {
  const [open, setOpen] = React.useState(false);
  //   const [value, setValue] = React.useState("");
  let [components, setComponents] = React.useState([]);

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:8001/api/products");
        const products = res.data;

        // Transform products into the desired components format
        const transformedComponents = products.map((product) => ({
          value: product.name.toLowerCase().replace(/\s/g, ""),
          label: product.name,
        }));

        // Update state with the transformed components
        setComponents(transformedComponents);
      } catch (error) {
        // Handle any errors that occur during the request
        console.error("Error fetching data:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? components.find((component) => component.value === value)?.label
            : "Select component..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search component..." />
          <CommandEmpty>No component found.</CommandEmpty>
          <CommandGroup className="h-40 overflow-y-scroll">
            {components.map((component) => (
              <CommandItem
                key={component.value}
                value={component.value}
                onSelect={(currentValue) => {
                  setValue(currentValue === value ? "" : currentValue);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === component.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {component.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
