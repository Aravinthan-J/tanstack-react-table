import { useState } from "react";

import { InputVariants } from "../variant.ts";

export const EmailCell = ({
  value,
  onChange,
  onDone,
  isError,
  readOnly,
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
    readOnly: readOnly,
  });

  const [isEdit, setEdit] = useState(false);

  return isEdit ? (
    <input
      type="email"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onBlur={() => {
        setEdit(false);
        onDone();
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setEdit(false);
          onDone();
        }
        if (e.key === "Escape") {
          setEdit(false);
        }
      }}
      className={base()}
      readOnly={readOnly}
      disabled={readOnly}
      autoFocus={true}
    />
  ) : (
    <div
      onClick={() => {
        !isEdit && !readOnly && setEdit(true);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          !isEdit && !readOnly && setEdit(true);
        }
      }}
      className="mx-10 cursor-pointer"
      role="button"
      tabIndex={readOnly ? -1 : 0}
    >
      {value}
    </div>
  );
};
