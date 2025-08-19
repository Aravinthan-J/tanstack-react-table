import * as Dialog from "@radix-ui/react-dialog";
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

  return (
    <Dialog.Root open={isEdit} onOpenChange={setEdit}>
      <Dialog.Trigger asChild>
        <div
          className="mx-10 ellipsis cursor-pointer"
          role="button"
          tabIndex={readOnly ? -1 : 0}
        >
          {value}
        </div>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-8 shadow-500 w-96 max-w-[90vw]">
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
