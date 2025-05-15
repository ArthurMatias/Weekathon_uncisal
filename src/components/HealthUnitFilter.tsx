
import React, { useState } from 'react';
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
import { Button } from "@/components/ui/button";

// Mock data for health units
const healthUnits = [
  { value: "all", label: "All Units" },
  { value: "central-hospital", label: "Central Hospital" },
  { value: "north-clinic", label: "North Clinic" },
  { value: "south-medical-center", label: "South Medical Center" },
  { value: "east-health-facility", label: "East Health Facility" },
  { value: "west-community-clinic", label: "West Community Clinic" },
];

interface HealthUnitFilterProps {
  onFilterChange: (value: string) => void;
}

const HealthUnitFilter: React.FC<HealthUnitFilterProps> = ({ onFilterChange }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("all");

  return (
    <div className="flex flex-col">
      <h3 className="text-sm font-medium mb-2 text-gray-500">Filter by Health Unit</h3>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between font-normal bg-white"
          >
            {value ? healthUnits.find((unit) => unit.value === value)?.label : "Select unit..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput placeholder="Search health unit..." />
            <CommandEmpty>No health unit found.</CommandEmpty>
            <CommandGroup>
              {healthUnits.map((unit) => (
                <CommandItem
                  key={unit.value}
                  value={unit.value}
                  onSelect={(currentValue) => {
                    const selectedValue = currentValue === value ? "all" : currentValue;
                    setValue(selectedValue);
                    onFilterChange(selectedValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === unit.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {unit.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default HealthUnitFilter;
