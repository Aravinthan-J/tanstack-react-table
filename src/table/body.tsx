import type { Row } from "@tanstack/react-table";
import type { Virtualizer } from "@tanstack/react-virtual";

import { DraggableRow, NormalRowRender, TableBodyRow } from "./virtualrow.tsx";
import { useTable } from "./tablecontext.tsx";

interface TableBodyProps {
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
  isVirtual: boolean;
}

export function TableBody({ rowVirtualizer, isVirtual }: TableBodyProps) {
  const { table } = useTable();
  const rows = table.getRowModel().rows;

  if (!isVirtual) {
    return (
      <tbody className="tableBody">
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
      className="grid relative tableBody"
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
