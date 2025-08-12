import { type Cell, flexRender } from "@tanstack/react-table";
import React, { useMemo } from "react";

import { useTable } from "../TableProvider";
import { cellRegistry } from "../cells";
import { CELL_TYPES } from "../utils/events";

interface TableCellProps {
  cell: Cell<any, unknown>;
}

export function TableCell({ cell }: TableCellProps) {
  const { rowHeight, editableCellComponents } = useTable();
  const { column } = cell;

  const isPinned = column.getIsPinned();
  const isLastLeftPinned =
    isPinned === "left" && column.getIsLastColumn("left");

  const style = useMemo(
    () => ({
      position: isPinned ? "sticky" : "relative",
      left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
      right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
      boxShadow: isLastLeftPinned
        ? "inset -4px 0 4px -4px rgba(0, 0, 0, 0.1)"
        : undefined,
      zIndex: isPinned ? 10 : undefined,
      minWidth: `${column.columnDef.minSize || 100}px`,
      minHeight: `${rowHeight}px`,
      width: column.getSize(),
    }),
    [isPinned, isLastLeftPinned, column, rowHeight],
  );

  const cellType = column.columnDef.meta?.type || CELL_TYPES.READONLY;
  const isCustomRender = !!column.columnDef.meta?.customRender;

  // Use custom render if available
  if (isCustomRender) {
    return (
      <td
        className="table-cell custom-render"
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          padding: "4px 12px",
          borderRight: "1px solid hsl(var(--border))",
          backgroundColor: "inherit",
        }}
      >
        {flexRender(column.columnDef.cell, cell.getContext())}
      </td>
    );
  }

  // Use custom editable cell component if provided
  const CustomCellComponent = editableCellComponents[cellType];
  if (CustomCellComponent) {
    return (
      <td
        className="table-cell custom-component"
        style={{
          ...style,
          display: "flex",
          alignItems: "center",
          padding: "4px 12px",
          borderRight: "1px solid hsl(var(--border))",
          backgroundColor: "inherit",
        }}
      >
        <CustomCellComponent
          row={cell.row}
          column={column}
          value={cell.getValue()}
          onCommit={(value) => {
            // Handle cell value commit
            console.log("Cell commit:", {
              rowId: cell.row.id,
              columnId: column.id,
              value,
            });
          }}
          onCancel={() => {
            // Handle cell edit cancel
            console.log("Cell cancel");
          }}
          onChange={(value) => {
            // Handle cell value change
            console.log("Cell change:", value);
          }}
        />
      </td>
    );
  }

  // Use built-in cell component from registry
  const CellComponent =
    cellRegistry[cellType] || cellRegistry[CELL_TYPES.READONLY];

  return (
    <td
      className="table-cell built-in group/table_cell"
      style={{
        ...style,
        display: "flex",
        alignItems: "center",
        padding: "4px 12px",
        borderRight: "1px solid hsl(var(--border))",
        backgroundColor: "inherit",
      }}
    >
      <CellComponent
        row={cell.row}
        column={column}
        value={cell.getValue()}
        onCommit={(value) => {
          // Update the cell value
          const meta = cell.table.options.meta as any;
          if (meta?.updateData) {
            meta.updateData(cell.row.index, column.id, value);
          }
        }}
        onCancel={() => {
          // Handle cancel
          console.log("Cell edit cancelled");
        }}
        onChange={(value) => {
          // Handle live changes during editing
          console.log("Cell value changing:", value);
        }}
        readOnly={column.columnDef.meta?.isReadOnly || false}
        isError={false}
        errors={[]}
      />
    </td>
  );
}
