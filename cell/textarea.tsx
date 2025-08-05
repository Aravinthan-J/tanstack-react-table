import { useState } from "react";

import { InputBox } from "@/components/input-box/input.box.tsx";
import { MultiLineVariants } from "../variant.ts";

export const TextAreaCell = ({
  value = "",
  isError = false,
  readOnly = false,
  onChange,
  onDone: onBlur
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
    readOnly: readOnly
  });

  function onInput(event: React.ChangeEvent<HTMLTextAreaElement>) {
    onChange?.(event.target?.value);
  }

  return isEdit ? (
    <InputBox
      isReadOnly={readOnly}
      disabled={false}
      isError={isError}
      className={`textarea ${base()}`}
      containerClassName="flex h-full items-center"
      asChild
    >
      <textarea
        readOnly={readOnly}
        disabled={false}
        tabIndex={0}
        aria-disabled={false}
        aria-multiline={true}
        aria-readonly={readOnly}
        onInput={onInput}
        value={value}
        onBlur={() => {
          onBlur();
          setEdit(false);
        }}
        // biome-ignore lint/a11y/noAutofocus: <explanation>
        autoFocus={true}
      >
        {value}
      </textarea>
    </InputBox>
  ) : (
    <div
      onClick={() => {
        !isEdit && !readOnly && setEdit(true);
      }}
      onKeyDown={() => {
        !isEdit && !readOnly && setEdit(true);
      }}
      className="mx-10 ellipsis"
    >
      {value}
    </div>
  );
};
