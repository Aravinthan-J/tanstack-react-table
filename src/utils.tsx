import { useRef, useEffect, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { CellWrapper } from "./components/cell/index";
import { CellTypes } from "./components/cell/constant";
import { UPDATED_EVENTS } from "./constant";
import { useTable } from "./components/tablecontext";

// Default column configuration with inline editing support
export const defaultColumn: Partial<ColumnDef<object>> = {
  cell: ({ getValue, row: { id }, column }) => {
    const { tableRef } = useTable();
    const initialValue = getValue() as string;
    const valueRef = useRef(initialValue);
    const [value, setValue] = useState(initialValue);
    const [isError, setError] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    useEffect(() => {
      setValue(initialValue);
      valueRef.current = initialValue;
    }, [initialValue]);

    const type = column.columnDef?.meta?.type;

    const onDone = () => {
      const error = onValidate();
      if (initialValue === valueRef.current?.trim?.()) {
        return;
      }
      if (error) return;
      tableRef.onRowUpdate({
        rowId: id,
        changedValue: { [column.id]: valueRef.current }
      });
      tableRef.updateTableData?.({
        type: UPDATED_EVENTS.CELL_EDIT,
        value: {
          rowId: id,
          changedValue: { [column.id]: valueRef.current },
          columnId: column.id
        }
      });
    };

    const onValidate = () => {
      const validate = (
        column.columnDef?.meta as { validate?: (value: string) => string[] }
      )?.validate;
      const error = validate ? validate(valueRef.current) : [];
      setErrors(error);
      setError(error.length > 0);
      return error.length > 0;
    };

    if (!type || !CellTypes[type]) {
      return initialValue;
    }

    return (
      <CellWrapper
        type={type}
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          valueRef.current = newValue;
        }}
        onDone={onDone}
        column={column}
        readOnly={
          (column.columnDef?.meta as { isReadOnly?: boolean })
            .isReadOnly as boolean
        }
        isError={isError}
        errors={errors}
      />
    );
  },
  minSize: 200,
  maxSize: 800
};
