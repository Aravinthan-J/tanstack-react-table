import { useState } from "react";

import { INPUT_BOX_FORMAT } from "../input-box/constant.ts";
import { SingleLine } from "../singleline/index.tsx";
import { InputVariants } from "../../variant";

export const EmailCell = ({
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
  const { base } = InputVariants({
    isError: isError,
    readOnly: readOnly
  });

  const [isEdit, setEdit] = useState(false);

  return isEdit ? (
    <SingleLine
      value={value}
      inputType={INPUT_BOX_FORMAT.EMAIL}
      onChange={onChange}
      onBlur={() => {
        setEdit(false);
        onDone();
      }}
      className={base()}
      isError={isError}
      readOnly={readOnly}
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
