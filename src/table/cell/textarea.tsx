import { useState } from "react";

import { MultiLineVariants } from "../variant.ts";

export const TextAreaCell = ({
  value = "",
  isError = false,
  readOnly = false,
  onChange,
  onDone: onBlur,
}: {
  value: string;
  isError: boolean;
  readOnly: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
  onDone: () => void;
}) => {
  const [isEdit, setEdit] = useState(false);

  const { base } = MultiLineVariants({
    isError: isError,
    readOnly: readOnly,
  });

  function onInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange?.(event.target?.value);
  }

  return isEdit ? (
    <textarea
      readOnly={readOnly}
      disabled={readOnly}
      tabIndex={0}
      aria-disabled={readOnly}
      aria-multiline={true}
      aria-readonly={readOnly}
      onChange={onInput}
      value={value}
      onBlur={() => {
        onBlur();
        setEdit(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setEdit(false);
        }
      }}
      className={`${base()} w-full h-32 resize-none`}
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
