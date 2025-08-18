import * as Popover from "@radix-ui/react-popover";
import { useState } from "react";
import { formatDate } from "date-fns";
import { DEFAULT_DATE_FORMAT } from "./constant";


export function DateCell({
  value,
  onChange,
  onDone,
  isError,
  readOnly,
}: {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
  onDone: () => void;
  isError: boolean;
  readOnly: boolean;
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
          {value ? formatDate(value, DEFAULT_DATE_FORMAT) : ""}
        </div>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="bg-white p-4 rounded-lg shadow-lg border">
          <input
            type="date"
            value={value ? formatDate(value, "yyyy-MM-dd") : ""}
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
              isError ? "border-red-500" : "border-gray-300"
            }`}
            disabled={readOnly}
            autoFocus={true}
          />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
