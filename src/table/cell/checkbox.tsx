import * as Checkbox from "@radix-ui/react-checkbox";

interface CheckboxProps {
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
}

export function CheckboxComponent({
  checked,
  onChange,
  disabled = false,
}: CheckboxProps) {
  return (
    <Checkbox.Root
      checked={checked}
      onCheckedChange={onChange}
      disabled={disabled}
      className="flex h-4 w-4 appearance-none items-center justify-center rounded border border-gray-300 bg-white data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Checkbox.Indicator className="text-white text-xs">✓</Checkbox.Indicator>
    </Checkbox.Root>
  );
}
