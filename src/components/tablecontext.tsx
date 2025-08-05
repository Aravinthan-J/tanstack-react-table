import { createContext, type ReactNode, useContext } from "react";
import type { useReactTable } from "@tanstack/react-table";

import type { DataTableRef, ExpandableProps } from "./index";

export interface TableContextProps {
  /**
   * The table instance created using useReactTable
   */
  table: ReturnType<typeof useReactTable>;

  /**
   * Properties related to expandable row functionality
   */
  expandable: ExpandableProps;

  /**
   * The height of each table row
   */
  rowHeight: number;
  /**
   * Forwarded ref object to access the DataTableRef interface
   */
  tableRef: DataTableRef;
  grouping: {
    enabled: boolean;
    groupBy: string[];
  };
  striped: boolean;
  bordered: boolean;
  compact: boolean;
  hoverable: boolean;
  density: 'comfortable' | 'compact' | 'spacious';
  theme?: 'light' | 'dark';
  classNames?: {
    table?: string;
    tableContainer?: string;
    header?: string;
    headerCell?: string;
    body?: string;
    row?: string;
    cell?: string;
  };
}

export const TableContext = createContext({} as TableContextProps);

// Custom hook to use the context
export function useTable(): TableContextProps {
  return useContext(TableContext);
}

// Provider props type
export interface TableProviderProps extends TableContextProps {
  children: ReactNode;
}

// Context provider
export function TableProvider({
  children,
  table,
  expandable,
  rowHeight,
  tableRef,
  grouping,
  striped,
  bordered,
  compact,
  hoverable,
  density,
  theme,
  classNames
}: TableProviderProps) {
  const value: TableContextProps = {
    table,
    expandable,
    rowHeight,
    tableRef,
    grouping,
    striped,
    bordered,
    compact,
    hoverable,
    density,
    theme,
    classNames
  };

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
}
