
import React from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface TimeframeSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
}

const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({ value, onValueChange }) => {
  return (
    <div className="flex flex-col">
      <h3 className="text-sm font-medium mb-2 text-gray-500">Time Period</h3>
      <ToggleGroup type="single" value={value} onValueChange={onValueChange} className="justify-start">
        <ToggleGroupItem value="day" className="text-xs">Day</ToggleGroupItem>
        <ToggleGroupItem value="week" className="text-xs">Week</ToggleGroupItem>
        <ToggleGroupItem value="month" className="text-xs">Month</ToggleGroupItem>
        <ToggleGroupItem value="year" className="text-xs">Year</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default TimeframeSelector;
