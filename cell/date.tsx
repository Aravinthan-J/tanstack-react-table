import { useState } from "react";
import { formatDate } from "date-fns";

import { DateTimePicker } from "@/components/picker/datetime.picker.tsx";
import { DataTrigger } from "./pickertrigger.tsx";
import { DEFAULT_DATE_FORMAT } from "@/components/picker/constant.ts";

export function DateCell({
  value,
  onChange,
  onDone,
  isError,
  readOnly
}: {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
  onDone: () => void;
  isError: boolean;
  readOnly: boolean;
}) {
  const [isEdit, setEdit] = useState(false);

  return isEdit ? (
    <DateTimePicker
      value={value}
      onChange={(newValue) => {
        onChange(newValue);
        onDone();
        setEdit(false);
      }}
      readonly={readOnly}
      isError={isError}
      includeTime={false}
      showQuickDates={false}
      trigger={
        <DataTrigger
          value={value}
          readOnly={readOnly}
          isError={isError}
          includeTime={false}
        />
      }
      onClose={() => {
        setEdit(false);
      }}
      open={true}
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
      {value ? formatDate(value, DEFAULT_DATE_FORMAT) : ""}
    </div>
  );
}
