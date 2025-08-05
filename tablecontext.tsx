import { createContext, type ReactNode, useContext } from "react";
import type { useReactTable } from "@tanstack/react-table";

import type { DataTableRef, ExpandableProps } from "./table.tsx";

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
  tableRef
}: TableProviderProps) {
  const value: TableContextProps = {
    table,
    expandable,
    rowHeight,
    tableRef
  };

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
}
