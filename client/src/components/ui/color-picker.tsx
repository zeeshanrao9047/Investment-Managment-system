import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const colors = [
  // Blues
  '#1E40AF', '#3B82F6', '#93C5FD',
  // Greens
  '#15803D', '#22C55E', '#86EFAC',
  // Teals
  '#0D9488', '#2DD4BF', '#99F6E4',
  // Reds
  '#BE123C', '#F43F5E', '#FDA4AF',
  // Purples
  '#7E22CE', '#A855F7', '#D8B4FE',
  // Oranges
  '#C2410C', '#F97316', '#FDBA74',
  // Greys
  '#1F2937', '#4B5563', '#9CA3AF',
  // Primary brand
  '#4CC7D1',
];

export function ColorPicker({ value, onChange, className }: ColorPickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "w-10 h-10 rounded-md border border-input",
            className
          )}
          style={{ backgroundColor: value }}
          type="button"
        >
          <span className="sr-only">Pick a color</span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="grid grid-cols-5 gap-2">
          {colors.map((color) => (
            <button
              key={color}
              className={cn(
                "w-8 h-8 rounded-md border border-gray-200 transition-all",
                color === value ? "ring-2 ring-offset-2 ring-primary" : ""
              )}
              style={{ backgroundColor: color }}
              onClick={() => onChange(color)}
              type="button"
            >
              <span className="sr-only">{color}</span>
            </button>
          ))}
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-8 h-8 cursor-pointer"
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}