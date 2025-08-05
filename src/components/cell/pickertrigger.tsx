import { useState, useMemo, useEffect } from "react";
// import { formatDate } from "date-fns";
import { DateTimeBoxVariants } from "../../variant";
import { InputBox } from "../input-box/input.box";
import { DEFAULT_DATE_FORMAT, DEFAULT_DATETIME_FORMAT, PICKER_INPUT_SIZE } from "../picker/constant";

const FormFieldDateTime = () => null;
const FormFieldDate = () => null;
const ICON_SIZE = { SIZE_16: 16 };
const ICON_STROKE = { THIN: "thin" };

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={ICON_SIZE.SIZE_16}
          height={ICON_SIZE.SIZE_16}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={ICON_STROKE.THIN === "thin" ? 1 : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {includeTime ? <path d="M12 2v10" /> : <path d="M8 2v4" />}
          {includeTime ? <path d="M18 6H6" /> : <path d="M16 2v4" />}
          {includeTime ? <path d="M22 10H2" /> : <path d="M21 12V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7" />}
          {includeTime ? <path d="M12 10a6 6 0 1 0 0 12a6 6 0 0 0 0-12z" /> : <path d="M3 10h18" />}
          {includeTime ? null : <path d="M7 14h.01" />}
          {includeTime ? null : <path d="M11 14h.01" />}
          {includeTime ? null : <path d="M15 14h.01" />}
          {includeTime ? null : <path d="M7 18h.01" />}
          {includeTime ? null : <path d="M11 18h.01" />}
          {includeTime ? null : <path d="M15 18h.01" />}
        </svg>
      }
    />
  );
}
