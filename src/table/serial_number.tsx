import type { useReactTable } from "@tanstack/react-table";

// import { Checkbox } from "../checkbox/checkbox.tsx";
import { RowDragHandleCell } from "./virtualrow.tsx";
import { DEFAULT_KEYS, UPDATED_EVENTS } from "./constant.ts";
import { useTable } from "./tablecontext.tsx";
import { CheckboxComponent } from "./cell/checkbox.tsx";

export const SerialNumberColumn = {
  accessorKey: DEFAULT_KEYS.SELECT,
  id: DEFAULT_KEYS.SELECT,
  header: ({ table }: { table: ReturnType<typeof useReactTable> }) => {
    const { tableRef } = useTable();
    const showCheckBox =
      table.options.enableRowSelection &&
      (table.getIsSomePageRowsSelected() || table.getIsAllPageRowsSelected());
    return (
      <div className="pl-2 flex justify-center w-full cursor-pointer group/header">
        <span
          className={`group-hover/header:hidden ${
            !showCheckBox ? "flex" : "hidden"
          }`}
        >
          #
        </span>
        <span
          className={`group-hover/header:flex ${
            showCheckBox ? "flex" : "hidden"
          }`}
        >
          <CheckboxComponent
            onChange={() => {
              table.toggleAllPageRowsSelected();
              tableRef.updateTableData({
                type: UPDATED_EVENTS.ALL_ROW_SELECTED,
                value: { selected: !table.getIsAllPageRowsSelected() },
              });
            }}
            checked={table.getIsAllPageRowsSelected()}
            disabled={!table.options.enableRowSelection}
          />
        </span>
      </div>
    );
  },
  cell: ({
    row: { index, id, parentId, toggleSelected, getIsSelected, getCanSelect },
    table,
  }: {
    row: {
      index: number;
      id: string;
      parentId: string;
      getCanSelect: () => boolean;
      getIsSelected: () => boolean;
      toggleSelected: () => void;
    };
    table: ReturnType<typeof useReactTable>;
  }) => {
    const { tableRef } = useTable();
    const showCheckBox = table.options.enableRowSelection && getIsSelected();
    return (
      <div
        className="pl-2 flex justify-center items-center w-full cursor-pointer relative"
        key={id}
      >
        {(table.options.meta as { enableRowOrdering: boolean })
          .enableRowOrdering &&
          !parentId &&
          !table.getIsSomePageRowsSelected() && (
            <RowDragHandleCell rowId={id} />
          )}
        <span
          className={`group-hover/tablerow:hidden ${
            !showCheckBox ? "flex" : "hidden"
          }`}
        >
          {index + 1}
        </span>
        <span
          className={`group-hover/tablerow:flex ${
            showCheckBox ? "flex" : "hidden"
          }`}
        >
          <CheckboxComponent
            checked={getIsSelected()}
            onChange={() => {
              toggleSelected();
              tableRef.updateTableData({
                type: UPDATED_EVENTS.ROW_SELECT,
                value: { id: id, selected: !getIsSelected() },
              });
            }}
            disabled={!getCanSelect()}
          />
        </span>
      </div>
    );
  },
  footer: () => null,
  size: 60,
  minSize: 60,
  maxSize: 60,
  enableResizing: false,
  enableHiding: false, // disable hiding for this column
  enableSorting: false, // disable sorting for this column
};
