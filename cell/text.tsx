import { useState } from "react";

import { INPUT_BOX_FORMAT } from "@/components/input-box/constant.ts";
import { SingleLine } from "@/components/singleline/index.ts";
import { InputVariants } from "../variant.ts";

export const TextCell = ({
  value,
  onChange,
  onDone,
  isError,
  readOnly
}: {
  value: string;
  type: string;
  onChange: (value: string | number) => void;
  onDone: () => void;
  isError: boolean;
  readOnly: boolean;
}) => {
  const [isEdit, setEdit] = useState(false);

  const { base } = InputVariants({
    isError: isError,
    readOnly: readOnly
  });
  return isEdit ? (
    <SingleLine
      value={value}
      inputType={INPUT_BOX_FORMAT.TEXT}
      onChange={onChange}
      onBlur={() => {
        setEdit(false);
        onDone();
      }}
      className={base()}
      readOnly={readOnly}
      isError={isError}
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
