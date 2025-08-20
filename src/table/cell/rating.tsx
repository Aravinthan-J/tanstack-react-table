import * as RadioGroup from "@radix-ui/react-radio-group";

import { RatingVariants } from "../variant.ts";

export function RatingCell({
  value,
  onChange,
  onDone: onBlur,
  readOnly,
  isError,
}: {
  value: number;
  onChange: (value: number | undefined) => void;
  onDone: () => void;
  readOnly: boolean;
  isError: boolean;
}) {
  const { base } = RatingVariants({
    isError,
    readOnly,
  });

  const handleValueChange = (newValue: string) => {
    onChange(parseInt(newValue));
    onBlur();
  };

  return (
    <div className={base()}>
      <RadioGroup.Root
        value={value.toString()}
        onValueChange={handleValueChange}
        disabled={readOnly}
        className="flex gap-4"
      >
        {[1, 2, 3, 4, 5].map((rating) => (
          <RadioGroup.Item
            key={rating}
            value={rating.toString()}
            className="w-20 h-fit cursor-pointer disabled:cursor-not-allowed"
          >
            <span
              className={`text-xl ${
                value >= rating ? "text-yellow-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>
    </div>
  );
}
