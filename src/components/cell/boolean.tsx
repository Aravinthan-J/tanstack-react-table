import { Switch } from "../switch/switch.tsx";

export function BooleanCell({
  value,
  onChange,
  onDone,
  readOnly
}: {
  value: boolean;
  onChange: (value: boolean) => void;
  onDone: () => void;
  readOnly: boolean;
}) {
  return (
    <Switch
      value={value}
      onChange={(newValue) => {
        onChange(newValue);
        onDone();
      }}
      disabled={readOnly}
    />
  );
}
