import * as Popover from "@radix-ui/react-popover";
import * as Select from "@radix-ui/react-select";
import { useState } from "react";
import { InputVariants } from "../variant";
import type { CURRENCY_LIST_TYPE } from "./constant";
import type { Column } from "@tanstack/react-table";

export function CurrencyCell({
  value,
  onChange,
  onDone,
  isError,
  readOnly,
  column,
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
    readOnly: readOnly,
  });

  const handleCurrencyChange = (type: CURRENCY_LIST_TYPE) => {
    setSelectedCurrency(type);
    setEdit(false);
    onDone();
  };

  return (
    <Popover.Root open={isEdit} onOpenChange={setEdit}>
      <Popover.Trigger asChild>
        <div
          className="mx-10 cursor-pointer"
          role="button"
          tabIndex={readOnly ? -1 : 0}
        >
          {selectedCurrency} {value}
        </div>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content className="bg-white p-4 rounded-8 shadow-lg border">
          <div className="flex gap-2">
            <input
              type="number"
              value={value}
              onChange={(e) => onChange(parseFloat(e.target.value))}
              onBlur={() => {
                setEdit(false);
                onDone();
              }}
              className={base()}
              disabled={readOnly}
              autoFocus={true}
            />

            <Select.Root
              value={selectedCurrency}
              onValueChange={handleCurrencyChange}
            >
              <Select.Trigger className="flex items-center justify-between px-3 py-2 border rounded">
                <Select.Value />
                <Select.Icon />
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className="bg-white border rounded shadow-lg">
                  <Select.Viewport className="p-1">
                    {/* Add your currency options here */}
                    <Select.Item
                      value="USD"
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      <Select.ItemText>USD</Select.ItemText>
                    </Select.Item>
                    <Select.Item
                      value="EUR"
                      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      <Select.ItemText>EUR</Select.ItemText>
                    </Select.Item>
                  </Select.Viewport>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
