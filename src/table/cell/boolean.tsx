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
      className="peer shrink-0 p-2 relative inline-flex items-center cursor-pointer rounded-full transition-colors focus-visible:outline-hidden focus-visible:focus-outer disabled:cursor-not-allowed data-[state=unchecked]:bg-gray-400 data-[state=unchecked]:hover:bg-gray-500 data-[state=unchecked]:active:bg-gray-600 group h-[24px] w-[40px] data-[state=checked]:bg-secondary-one-500 data-[state=checked]:hover:bg-secondary-one-600 data-[state=checked]:active:bg-secondary-one-600 switch border-0"
    >
      <Switch.Thumb className="h-full block aspect-square rounded-full bg-white transition-aspect data-[state=unchecked]:translate-x-0 peer-disabled:pointer-events-none duration-200 group-active:aspect-[1.2/1] data-[state=checked]:translate-x-16" />
    </Switch.Root>
  );
}
