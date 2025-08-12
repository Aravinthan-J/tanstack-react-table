import type { Column, ColumnDef } from "@tanstack/react-table";
import type { ColumnProps } from "../Table.types";

export function getColumnWidth(column: Column<any>): number {
  return column.getSize();
}

export function isColumnPinned(column: Column<any>): boolean {
  return !!column.getIsPinned();
}

export function canColumnResize(column: Column<any>): boolean {
  return column.getCanResize();
}

export function canColumnSort(column: Column<any>): boolean {
  return column.getCanSort();
}

export function getColumnSortDirection(
  column: Column<any>
): "asc" | "desc" | false {
  return column.getIsSorted();
}

export function createColumnFromLegacy(
  legacyColumn: ColumnProps
): ColumnDef<any> {
  return {
    id: legacyColumn.Id,
    accessorKey: legacyColumn.Id,
    header: legacyColumn.Title,
    size: legacyColumn.Width || 150,
    minSize: legacyColumn.MinWidth || 50,
    maxSize: legacyColumn.MaxWidth || 500,
    enableSorting: legacyColumn.enableSorting ?? true,
    enableResizing: legacyColumn.enableResizing ?? true,
    enableHiding: legacyColumn.enableHiding ?? true,
    enablePinning: legacyColumn.enablePinning ?? true,
    cell: legacyColumn.Render || undefined,
    footer: legacyColumn.Footer || undefined,
    meta: {
      type: legacyColumn.Type || "text",
      fixed: legacyColumn.Fixed,
      enableOrdering: legacyColumn.enableOrdering ?? true,
      ...legacyColumn.meta,
    },
  };
}

export function validateColumnDefinition(column: ColumnProps): string[] {
  const errors: string[] = [];

  if (!column.Id) {
    errors.push("Column must have an Id");
  }

  if (!column.Title && !column.Header) {
    errors.push("Column must have a Title or Header");
  }

  if (column.Width && column.Width < 0) {
    errors.push("Column width must be positive");
  }

  if (column.MinWidth && column.MaxWidth && column.MinWidth > column.MaxWidth) {
    errors.push("Column MinWidth cannot be greater than MaxWidth");
  }

  return errors;
}
