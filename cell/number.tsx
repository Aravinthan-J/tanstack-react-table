import { useState } from "react";

import { NumberInput } from "@/components/number-input/index.ts";
import { InputVariants } from "../variant.ts";

export const NumberCell = ({
  value,
  onChange,
  onDone,
  isError,
  readOnly
}: {
  value: number;
  onChange: (value: number | undefined) => void;
  onDone: () => void;
  isError: boolean;
  readOnly: boolean;
}) => {
  const { base } = InputVariants({
    isError: isError,
    readOnly: readOnly
  });

  const [isEdit, setEdit] = useState(false);

  return isEdit ? (
    <NumberInput
      value={value}
      onChange={onChange}
      onBlur={() => {
        setEdit(false);
        onDone();
      }}
      className={base()}
      readOnly={isError}
      isError={readOnly}
      autoFocus={true}
    />
  ) : (
    <div
      onClick={() => {
        !isEdit && !readOnly && setEdit(true);
      }}
      onKeyDown={() => {
        !isEdit && !readOnly && setEdit(true);
      }}
      className="mx-10"
    >
      {value}
    </div>
  );
};
