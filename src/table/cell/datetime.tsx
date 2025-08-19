import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { formatDate } from "date-fns";
import { DEFAULT_DATETIME_FORMAT } from "./constant";


export function DateTimeCell({
  value,
  onChange,
  onDone,
  readOnly,
  isError,
}: {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
  onDone: () => void;
  readOnly: boolean;
  isError: boolean;
}) {
  const [isEdit, setEdit] = useState(false);

  return (
    <Popover.Root open={isEdit} onOpenChange={setEdit}>
      <Popover.Trigger asChild>
        <div
          className="mx-10 cursor-pointer"
          role="button"
          tabIndex={readOnly ? -1 : 0}
        >
          {value ? formatDate(value, DEFAULT_DATETIME_FORMAT) : ""}
        </div>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="bg-white p-4 rounded-2 shadow-200 border">
          <input
            type="datetime-local"
            value={value ? formatDate(value, "yyyy-MM-dd'T'HH:mm") : ""}
            onChange={(e) => {
              const newDate = e.target.value
                ? new Date(e.target.value)
                : undefined;
              onChange(newDate);
              onDone();
              setEdit(false);
            }}
            onBlur={() => {
              setEdit(false);
            }}
            className={`px-3 py-2 border rounded ${
              isError ? "border-secondary-four-500" : "border-gray-300"
            }`}
            disabled={readOnly}
            autoFocus={true}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
