import type { Row } from "@tanstack/react-table";
import type { Virtualizer } from "@tanstack/react-virtual";

import { DraggableRow, NormalRowRender, TableBodyRow } from "./virtualrow";
import { useTable } from "./tablecontext";
import { tableBodyVariants } from "../variants/table";
import { cn } from "../utils/cn";

interface TableBodyProps {
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
  isVirtual: boolean;
}

export function TableBody({ rowVirtualizer, isVirtual }: TableBodyProps) {
  const { table, grouping, classNames } = useTable();
  
  const rows = grouping.enabled ? table.getExpandedRowModel().rows : table.getRowModel().rows;

  if (!isVirtual) {
    return (
      <tbody className={cn(tableBodyVariants(), classNames?.body)}>
        <DraggableRow>
          {rows.map((row) => {
            return <NormalRowRender key={row.id} row={row as Row<object>} />;
          })}
        </DraggableRow>
      </tbody>
    );
  }

  return (
    <tbody
      style={{ height: `${rowVirtualizer.getTotalSize()}px` }}
      className={cn("grid relative tableBody", classNames?.body)}
    >
      <DraggableRow>
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const row = rows[virtualRow.index] as Row<object>;
          return (
            <TableBodyRow
              key={row.id}
              row={row}
              virtualRow={virtualRow}
              rowVirtualizer={rowVirtualizer}
            />
          );
        })}
      </DraggableRow>
    </tbody>
  );
}
