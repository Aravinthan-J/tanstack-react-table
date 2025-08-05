import React from 'react';
import * as Select from '@radix-ui/react-select';
import { ChevronDownIcon } from '@radix-ui/react-icons';

interface DropdownCellProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  readOnly: boolean;
}

export const DropdownCell: React.FC<DropdownCellProps> = ({ value, onChange, options, readOnly }) => {
  return (
    <Select.Root value={value} onValueChange={onChange} disabled={readOnly}>
      <Select.Trigger className="flex items-center justify-between rounded px-2 py-1 text-sm leading-none h-full w-full">
        <Select.Value />
        <Select.Icon className="text-gray-400">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden rounded-md bg-white shadow-md">
          <Select.ScrollUpButton />
          <Select.Viewport className="p-1">
            <Select.Group>
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="relative flex items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-gray-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};