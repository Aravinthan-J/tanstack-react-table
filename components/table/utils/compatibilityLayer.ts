import type { ColumnDef } from "@tanstack/react-table";
import type { ColumnProps, TableOptionProps } from "../Table.types";
import type { Checkbox } from "../cells/Checkbox";
import { CELL_TYPES } from "./events";

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
      customRender: !!col.Render,
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
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Checkbox
            checked={table.getIsAllRowsSelected()}
            indeterminate={table.getIsSomeRowsSelected()}
            onChange={table.getToggleAllRowsSelectedHandler()}
          />
        </div>
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
        <span>row.index + 1</span>
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
 * Validates column configuration and provides migration warnings
 */
export function validateColumns(columns: ColumnProps[]): {
  isValid: boolean;
  warnings: string[];
  errors: string[];
} {
  const warnings: string[] = [];
  const errors: string[] = [];

  columns.forEach((column, index) => {
    // Check required fields
    if (!column.Id) {
      errors.push(`Column at index ${index}: Missing required "Id" field`);
    }

    if (!column.Title) {
      errors.push(`Column at index ${index}: Missing required "Title" field`);
    }

    // Check deprecated fields
    if (column.Fixed) {
      warnings.push(
        `Column "${column.Id}": "Fixed" property is deprecated. ` +
          "Use enablePinning and table.getColumn(id).pin() instead."
      );
    }

    // Check for unsupported cell types
    const supportedTypes = Object.values(CELL_TYPES);
    if (column.Type && !supportedTypes.includes(column.Type as any)) {
      warnings.push(
        `Column "${column.Id}": Unsupported cell type "${column.Type}". ` +
          `Supported types: ${supportedTypes.join(", ")}`
      );
    }

    // Check for conflicting properties
    if (column.Render && column.Type) {
      warnings.push(
        `Column "${column.Id}": Both "Render" and "Type" specified. ` +
          '"Render" will take precedence.'
      );
    }
  });

  return {
    isValid: errors.length === 0,
    warnings,
    errors,
  };
}

/**
 * Migration helper to update legacy column definitions
 */
export function migrateColumn(legacyColumn: any): ColumnProps {
  const migrated: any = { ...legacyColumn };

  // Handle common legacy field mappings
  if (legacyColumn.accessor && !migrated.Id) {
    migrated.Id = legacyColumn.accessor;
    console.warn(
      `Column: Mapped "accessor" to "Id" for column "${legacyColumn.accessor}"`
    );
  }

  if (legacyColumn.header && !migrated.Title) {
    migrated.Title = legacyColumn.header;
    console.warn(
      `Column: Mapped "header" to "Title" for column "${migrated.Id}"`
    );
  }

  if (legacyColumn.width && !migrated.Width) {
    migrated.Width = legacyColumn.width;
  }

  if (legacyColumn.minWidth && !migrated.MinWidth) {
    migrated.MinWidth = legacyColumn.minWidth;
  }

  if (legacyColumn.maxWidth && !migrated.MaxWidth) {
    migrated.MaxWidth = legacyColumn.maxWidth;
  }

  // Handle cell type mappings
  if (legacyColumn.cellType && !migrated.Type) {
    migrated.Type = legacyColumn.cellType;
  }

  return migrated as ColumnProps;
}
