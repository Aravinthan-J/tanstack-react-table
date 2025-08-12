import type { ColumnDef } from "@tanstack/react-table";
import type { ColumnProps, TableOptionProps } from "../Table.types";
import { Checkbox } from "../components/Checkbox";

/**
 * Maps legacy column structure to TanStack Table column definitions
 * Preserves backward compatibility with existing column props
 */
export function mapLegacyColumns(
  columns: ColumnProps[],
  options: TableOptionProps
): ColumnDef<any>[] {
  return columns.map((col) => ({
    id: col.Id,
    accessorKey: col.Id,
    header: col.Header || col.Title,
    footer: col.Footer,
    size: col.Width || 150,
    minSize: col.MinWidth || 50,
    maxSize: col.MaxWidth || 600,
    enableSorting: col.enableSorting ?? options.enableSorting,
    enableResizing: col.enableResizing ?? options.enableResizing,
    enableHiding: col.enableHiding ?? options.enableHiding,
    enablePinning: col.enablePinning ?? options.enablePinning,
    enableColumnFilter: true,
    cell: col.Render
      ? ({ row, table }) =>
          col.Render!({
            row,
            onExpand: () => row.toggleExpanded(),
            onDone: ({ rowId, changedValue }) => {
              // Handle update
            },
          })
      : ({ getValue }) => flexRender(getValue(), {}),
    meta: {
      ...col.meta,
      type: col.Type,
      customRender: !!col.Render,
      fixed: col.Fixed,
      enableOrdering: col.enableOrdering ?? options.enableOrdering,
      customRender: !!col.Render
    },
  }));
}

/**
 * Creates a serial number column with optional row selection
 */
export function createSerialNumberColumn(
  showRowSelection: boolean,
  options: TableOptionProps
): ColumnDef<any> {
  return {
    id: "select",
    header: ({ table }) =>
      showRowSelection ? (
        <Checkbox
          checked={table.getIsAllRowsSelected()}
          indeterminate={table.getIsSomeRowsSelected()}
          onChange={table.getToggleAllRowsSelectedHandler()}
        />
      ) : (
        "#"
      ),
    cell: ({ row, table }) =>
      showRowSelection ? (
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Checkbox
            checked={row.getIsSelected()}
            disabled={!row.getCanSelect()}
            onChange={row.getToggleSelectedHandler()}
          />
          <span>{row.index + 1}</span>
        </div>
      ) : (
        <span>{row.index + 1}</span>
      ),
    size: 60,
    minSize: 60,
    maxSize: 60,
    enableSorting: false,
    enableResizing: false,
    enableHiding: false,
    enablePinning: false,
    meta: {
      fixed: "left",
      enableOrdering: false,
    },
  };
}

/**
 * Validates incoming column structure and provides migration warnings
 */
export function validateColumns(columns: ColumnProps[]): string[] {
  const warnings: string[] = [];

  columns.forEach((col, index) => {
    if (!col.Id) {
      warnings.push(
        `Column at index ${index} is missing required 'Id' property`
      );
    }
    if (!col.Title && !col.Header) {
      warnings.push(`Column '${col.Id}' is missing Title or Header property`);
    }

    // Check for deprecated properties
    if ("accessor" in col) {
      warnings.push(
        `Column '${col.Id}' uses deprecated 'accessor' property. Use 'Id' instead.`
      );
    }
  });

  return warnings;
}
