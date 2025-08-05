import { useState } from "react";
import type { Column } from "@tanstack/react-table";

import { InputVariants } from "../variant.ts";
import { Currency } from "@/components/currency/currency.tsx";
import type { CURRENCY_LIST_TYPE } from "@/components/currency/constant.ts";

export function CurrencyCell({
  value,
  onChange,
  onDone,
  isError,
  readOnly,
  column
}: {
  value: number;
  onChange: (value: number | undefined) => void;
  onDone: () => void;
  isError: boolean;
  readOnly: boolean;
  column: Column<object>;
}) {
  const currencyType = (column.columnDef?.meta as { currencyType?: string })
    ?.currencyType as CURRENCY_LIST_TYPE;
  const [isEdit, setEdit] = useState(false);
  const [selectedCurrency, setSelectedCurrency] =
    useState<CURRENCY_LIST_TYPE>(currencyType);

  const { base } = InputVariants({
    isError: isError,
    readOnly: readOnly
  });

  const handleCurrencyChange = ({
    type
  }: { type: CURRENCY_LIST_TYPE; symbol: string }) => {
    setSelectedCurrency(type);
    setEdit(false);
    onDone();
  };

  return isEdit ? (
    <Currency
      value={value}
      onBlur={() => {
        setEdit(false);
        onDone();
      }}
      onChange={onChange}
      className={base()}
      isError={isError}
      readOnly={readOnly}
      autoFocus={false}
      selectedCurrency={selectedCurrency}
      onCurrencyChange={handleCurrencyChange}
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
      {selectedCurrency} {value}
    </div>
  );
}
