import type {
  Column,
  ColumnDef,
  Row,
  Table as TanStackTable,
  TableState as TanStackTableState,
} from "@tanstack/react-table";
import type React from "react";
import type { ReactNode } from "react";

// Preserve existing column structure exactly
export interface ColumnProps {
  // Unique identifier for the column
  Id: string;

  // Display title of the column
  Title: string | React.ReactNode;

  // Optional data type of the column
  Type?: string;

  // Optional custom render function for the column cell
  Render?: ({
    row,
    onExpand,
    onDone,
  }: {
    row: Row<object>;
    onExpand: () => void;
    onDone: ({
      rowId,
      changedValue,
    }: {
      rowId: string;
      changedValue: object;
    }) => void;
  }) => React.ReactNode;

  // Optional fixed position for the column (e.g., 'left' or 'right')
  Fixed?: string | null;

  // Enable sorting functionality for the column
  enableSorting?: boolean;

  // Enable resizing functionality for the column
  enableResizing?: boolean;

  // Enable hiding functionality for the column
  enableHiding?: boolean;

  // Enable pinning functionality for the column
  enablePinning?: boolean;

  // Enable ordering functionality for the column
  enableOrdering?: boolean;

  // Initial width of the column
  Width?: number;

  // Minimum width the column can be resized to
  MinWidth?: number;

  // Maximum width the column can be resized to
  MaxWidth?: number;

  // Optional custom footer renderer for the column
  Footer?: () => JSX.Element;

  // Optional custom header renderer for the column
  Header?: () => JSX.Element;

  // Additional meta properties
  meta?: Record<string, any>;
}

export interface ExpandableProps {
  type: string;
  isExpandable: boolean;
  expandEntireRowByClick?: boolean;
  expandedRowKeys?: Array<string>;
  expandedRowRender?: ((row: Row<object>) => React.ReactNode) | null;
}

export interface TableOptionProps {
  enableSorting?: boolean;
  enableResizing?: boolean;
  enableHiding?: boolean;
  enablePinning?: boolean;
  enableOrdering?: boolean;
  enableRowOrdering?: boolean;
}

// Enhanced table props with backward compatibility
export interface TableProps<T = any> {
  // Existing props (preserve exactly)
  selectedItems: Array<string>;
  showSerialNumber: boolean;
  showRowSelection: boolean;
  columns: Array<ColumnProps>;
  datasource: Array<T>;
  emptyState: ReactNode;
  onEventUpdate: ({
    type,
    value,
  }: {
    type: string;
    value: string | object | string[];
  }) => void;
  rowKey: string;
  expandable: ExpandableProps;
  onEndReached: () => void;
  loading?: boolean;
  isVirtual: boolean;
  tableHeight: number;
  rowHeight: number;
  options: TableOptionProps;

  // New enhanced props
  data?: Array<T>; // Alternative to datasource
  initialState?: Partial<TanStackTableState>;
  theme?: TableTheme;
  virtual?: boolean; // Alternative to isVirtual
  groupBy?: string[];
  editableCellComponents?: Record<string, React.ComponentType<CellProps>>;
  dndOptions?: DnDOptions;
  nestingOptions?: NestingOptions;
  validateCellEdit?: (
    row: Row<T>,
    column: Column<T>,
    value: any,
  ) => boolean | Promise<boolean>;
  onConflict?: (error: ValidationError) => void;
}

export interface CellProps<T = any> {
  row: Row<T>;
  column: Column<T>;
  value: any;
  onCommit: (value: any) => void;
  onCancel: () => void;
  onChange: (value: any) => void;
  validate?: (value: any) => boolean | string[];
  autoFocus?: boolean;
  ariaLabel?: string;
  readOnly?: boolean;
  isError?: boolean;
  errors?: string[];
}

export interface TableRef<T = any> {
  // Existing methods (preserve exactly)
  onRowUpdate: ({
    rowId,
    changedValue,
  }: {
    rowId: string;
    changedValue: object;
  }) => void;
  updateTableData: ({
    type,
    value,
  }: {
    type: string;
    value: string | object | string[];
  }) => void;
  onColumnValidate: ({ columnId }: { columnId: string }) => void;
  onVisibilityChange: (columnId: string, value: boolean) => void;
  onColumnDrag: (fromId: string, toId: string) => void;
  onRowDrag: (fromId: string, toId: string) => void;
  onPinColumn: (columnId: string, value: boolean) => void;
  onAllRowsSelected: (value: boolean) => void;
  onRowSelect: (rowId: string, value: boolean) => void;
  onAllRowsExpand: (value: boolean) => void;
  onRowExpand: (rowId: string, value: boolean) => void;
  resetColumnVisibility: (value: boolean) => void;
  getTableValues: () => TanStackTable<any>;
  getSelectedItems: () => string[];
  getExpandedItems: () => string[];
  getHiddenColumns: () => Record<string, boolean>;

  // New enhanced methods
  addRow: (row: T, index?: number) => void;
  removeRow: (rowId: string) => void;
  updateRow: (rowId: string, data: Partial<T>) => void;
  getRowById: (rowId: string) => Row<T> | null;
  getVisibleRows: () => Row<T>[];
  applyEdit: (rowId: string, columnId: string, value: any) => void;
  reorderCells: (rowId: string, fromIndex: number, toIndex: number) => void;
  reorderRows: (fromId: string, toId: string) => void;
  expandRow: (rowId: string) => void;
  collapseRow: (rowId: string) => void;
  expandAll: () => void;
  collapseAll: () => void;
  openGroup: (groupId: string) => void;
  closeGroup: (groupId: string) => void;
  setGroupBy: (fields: string[]) => void;
  selectRow: (rowId: string, selected?: boolean) => void;
  selectAll: (selected?: boolean) => void;
  getSelectedRows: () => string[];
  getTableState: () => TanStackTableState;
  resetTable: () => void;
}

// Event system
export type TableEvent =
  | {
      type: "CELL_EDIT";
      payload: { rowId: string; columnId: string; value: any; oldValue: any };
    }
  | { type: "ROW_ADD"; payload: { row: any; index: number } }
  | { type: "ROW_REMOVE"; payload: { rowId: string } }
  | { type: "ROW_REORDER"; payload: { fromId: string; toId: string } }
  | {
      type: "CELL_REORDER";
      payload: { rowId: string; fromIndex: number; toIndex: number };
    }
  | { type: "GROUP_TOGGLE"; payload: { groupId: string; expanded: boolean } }
  | { type: "ROW_EXPAND"; payload: { rowId: string; expanded: boolean } }
  | {
      type: "VALIDATION_ERROR";
      payload: { rowId: string; columnId: string; errors: string[] };
    }
  | { type: "ROW_SELECT"; payload: { rowId: string; selected: boolean } }
  | { type: "ALL_ROW_SELECTED"; payload: { selected: boolean } }
  | { type: "COLUMN_RESIZE"; payload: { columnId: string; width: number } }
  | { type: "COLUMN_DRAG"; payload: { fromId: string; toId: string } }
  | { type: "ROW_DRAG"; payload: { fromId: string; toId: string } };

// Theme system
export interface TableTheme {
  colors: {
    background: string;
    foreground: string;
    primary: string;
    secondary: string;
    muted: string;
    accent: string;
    border: string;
    error: string;
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
  borderRadius: {
    sm: string;
    md: string;
    lg: string;
  };
}

// Additional types
export interface DnDOptions {
  enabled: boolean;
  rowReorder?: boolean;
  cellReorder?: boolean;
}

export interface NestingOptions {
  enabled: boolean;
  maxDepth?: number;
  indentSize?: number;
}

export interface ValidationError {
  rowId: string;
  columnId: string;
  errors: string[];
}

export interface VirtualizedRowData {
  index: number;
  row: Row<any>;
  isGroup?: boolean;
  groupLevel?: number;
}
