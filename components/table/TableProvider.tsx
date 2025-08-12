import type { Table } from "@tanstack/react-table";
import type React from "react";
import { createContext, useContext } from "react";
import type { ExpandableProps , TableRef, TableTheme, CellProps} from "./Table.types";

interface TableContextValue {
  table: Table<any>;
  expandable: ExpandableProps;
  rowHeight: number;
  tableRef: TableRef;
  theme?: TableTheme;
  editableCellComponents: Record<string, React.ComponentType<CellProps>>;
}

const TableContext = createContext<TableContextValue | null>(null);

export function TableProvider({
  children,
  ...props
}: TableContextValue & { children: React.ReactNode }) {
  return (
    <TableContext.Provider value={props}>{children}</TableContext.Provider>
  );
}

export function useTable() {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTable must be used within TableProvider");
  }
  return context;
}
