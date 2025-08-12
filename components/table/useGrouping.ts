import type { GroupingState, Table } from "@tanstack/react-table";
import { useCallback, useEffect } from "react";

/**
 * Grouping functionality hook
 * Manages row grouping and aggregation
 */
export function useGrouping(table: Table<any>, initialGroupBy: string[] = []) {
  // Set initial grouping
  useEffect(() => {
    if (initialGroupBy.length > 0) {
      table.setGrouping(initialGroupBy);
    }
  }, []);

  const toggleGroup = useCallback(
    (columnId: string) => {
      const currentGrouping = table.getState().grouping;
      const isGrouped = currentGrouping.includes(columnId);

      if (isGrouped) {
        table.setGrouping(currentGrouping.filter((id) => id !== columnId));
      } else {
        table.setGrouping([...currentGrouping, columnId]);
      }
    },
    [table],
  );

  const clearGrouping = useCallback(() => {
    table.setGrouping([]);
  }, [table]);

  const setGrouping = useCallback(
    (grouping: GroupingState) => {
      table.setGrouping(grouping);
    },
    [table],
  );

  return {
    groupedColumns: table.getState().grouping,
    toggleGroup,
    clearGrouping,
    setGrouping,
  };
}
