import { CurrencyCell } from "./currency.tsx";
import { DateCell } from "./date.tsx";
import { DateTimeCell } from "./datetime.tsx";
import { EmailCell } from "./email.tsx";
import { NumberCell } from "./number.tsx";
import { RatingCell } from "./rating.tsx";
import { BooleanCell } from "./boolean.tsx";
import { TextCell } from "./text.tsx";
import { TextAreaCell } from "./textarea.tsx";

export const CellWidgets = {
  CURRENCY: CurrencyCell,
  DATE: DateCell,
  DATETIME: DateTimeCell,
  NUMBER: NumberCell,
  RATING: RatingCell,
  BOOLEAN: BooleanCell,
  TEXT: TextCell,
  TEXTAREA: TextAreaCell,
  EMAIL: EmailCell
};

export const CellTypes: Record<string, string> = {
  CURRENCY: "CURRENCY",
  DATE: "DATE",
  DATETIME: "DATETIME",
  NUMBER: "NUMBER",
  RATING: "RATING",
  BOOLEAN: "BOOLEAN",
  TEXT: "TEXT",
  TEXTAREA: "TEXTAREA",
  EMAIL: "EMAIL"
};
