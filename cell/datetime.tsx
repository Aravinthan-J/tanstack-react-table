import { useState } from "react";
import { formatDate } from "date-fns";

import { DateTimePicker } from "@/components/picker/datetime.picker.tsx";
import { DataTrigger } from "./pickertrigger.tsx";
import { DEFAULT_DATETIME_FORMAT } from "@/components/picker/constant.ts";

export function DateTimeCell({
  value,
  onChange,
  onDone,
  readOnly,
  isError
}: {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
  onDone: () => void;
  readOnly: boolean;
  isError: boolean;
}) {
  const [isEdit, setEdit] = useState(false);

  return isEdit ? (
    <DateTimePicker
      value={value}
      onChange={(newValue) => {
        setEdit(false);
        onChange(newValue);
        onDone();
      }}
      showFooter={true}
      readonly={readOnly}
      isError={isError}
      trigger={
        <DataTrigger
          value={value}
          readOnly={readOnly}
          isError={isError}
          includeTime={true}
        />
      }
      open={true}
      onClose={() => {
        setEdit(false);
      }}
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
      {value ? formatDate(value, DEFAULT_DATETIME_FORMAT) : ""}
    </div>
  );
}
