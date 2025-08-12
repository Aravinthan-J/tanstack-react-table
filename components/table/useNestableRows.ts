import type { Row, Table } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import type { ExpandableProps } from "./Table.types";

/**
 * Nested rows functionality hook
 * Manages hierarchical data structures
 */
export function useNestableRows(
  table: Table<any>,
  expandable: ExpandableProps,
) {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(
    new Set(expandable.expandedRowKeys || []),
  );

  const toggleRowExpansion = useCallback(
    (rowId: string) => {
      const row = table.getRow(rowId);
      if (!row) return;

      row.toggleExpanded();

      setExpandedRows((prev) => {
        const next = new Set(prev);
        if (next.has(rowId)) {
          next.delete(rowId);
        } else {
          next.add(rowId);
        }
        return next;
      });
    },
    [table],
  );

  const expandAllRows = useCallback(() => {
    table.toggleAllRowsExpanded(true);
    const allRowIds = table.getRowModel().rows.map((row) => row.id);
    setExpandedRows(new Set(allRowIds));
  }, [table]);

  const collapseAllRows = useCallback(() => {
    table.toggleAllRowsExpanded(false);
    setExpandedRows(new Set());
  }, [table]);

  const getRowDepth = useCallback(
    (row: Row<any>): number => {
      let depth = 0;
      let current = row;
      while (current.parentId) {
        depth++;
        current = table.getRow(current.parentId);
        if (!current) break;
      }
      return depth;
    },
    [table],
  );

  return {
    expandedRows,
    toggleRowExpansion,
    expandAllRows,
    collapseAllRows,
    getRowDepth,
  };
}
