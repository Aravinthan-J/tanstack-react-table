import { useState, useMemo, useEffect } from "react";
import { formatDate } from "date-fns";
import {
  KfIcon,
  FormFieldDateTime,
  FormFieldDate,
  ICON_SIZE,
  ICON_STROKE
} from "kf-icons";

import { InputBox } from "@/components/input-box/input.box.tsx";
import {
  DEFAULT_DATE_FORMAT,
  DEFAULT_DATETIME_FORMAT,
  PICKER_INPUT_SIZE
} from "@/components/picker/constant.ts";
import { DateTimeBoxVariants } from "../variant.ts";

export function DataTrigger({
  value,
  format,
  placeholder,
  includeTime,
  readOnly,
  isError
}: {
  value: Date | undefined;
  format?: string;
  placeholder?: string;
  includeTime: boolean;
  readOnly: boolean;
  isError: boolean;
}) {
  const [date, setDate] = useState<Date | undefined>(undefined);

  const formattedDate = useMemo(
    function getInputValue() {
      const formatStr =
        format || (includeTime ? DEFAULT_DATETIME_FORMAT : DEFAULT_DATE_FORMAT);
      if (includeTime) {
        return value ? formatDate(value, formatStr) : "";
      }
      return date ? formatDate(date, formatStr) : "";
    },
    [date, includeTime, format, value]
  );

  useEffect(
    function updateValue() {
      value && setDate(new Date(value));
    },
    [value]
  );
  const { base } = DateTimeBoxVariants({
    isError: isError,
    readOnly: readOnly
  });

  return (
    <InputBox
      className={base()}
      placeholder={placeholder}
      size={PICKER_INPUT_SIZE.MEDIUM}
      readOnly={true}
      isReadOnly={readOnly}
      isError={isError}
      value={formattedDate}
      suffix={
        <KfIcon
          name={includeTime ? FormFieldDateTime : FormFieldDate}
          size={ICON_SIZE.SIZE_16}
          stroke={ICON_STROKE.THIN}
        />
      }
    />
  );
}
