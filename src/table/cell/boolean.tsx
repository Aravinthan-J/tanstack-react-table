import * as Switch from "@radix-ui/react-switch";

export function BooleanCell({
  value,
  onChange,
  onDone,
  readOnly,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
  onDone: () => void;
  readOnly: boolean;
}) {
  return (
    <Switch.Root
      checked={value}
      onCheckedChange={(newValue) => {
        onChange(newValue);
        onDone();
      }}
      disabled={readOnly}
      className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-blue-600 outline-none cursor-default disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Switch.Thumb className="block w-5 h-5 bg-white rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[22px]" />
    </Switch.Root>
  );
}
