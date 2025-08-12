import { useCallback, useMemo } from "react";
import type { Row, Table } from "@tanstack/react-table";
import type { TableEvent } from "../Table.types";

interface UseRowActionsProps<T = any> {
  table: Table<T>;
  row: Row<T>;
  onEvent?: (event: TableEvent) => void;
}

export function useRowActions<T = any>({
  table,
  row,
  onEvent,
}: UseRowActionsProps<T>) {
  const canExpand = useMemo(() => row.getCanExpand(), [row]);
  const isExpanded = useMemo(() => row.getIsExpanded(), [row]);
  const canSelect = useMemo(() => row.getCanSelect(), [row]);
  const isSelected = useMemo(() => row.getIsSelected(), [row]);
  const isGrouped = useMemo(() => row.getIsGrouped(), [row]);
  const depth = useMemo(() => row.depth, [row]);
  const subRowsCount = useMemo(() => row.subRows?.length || 0, [row.subRows]);

  const toggleExpanded = useCallback(
    (expanded?: boolean) => {
      if (!canExpand) return false;

      const newExpanded = expanded ?? !isExpanded;
      row.toggleExpanded(newExpanded);

      onEvent?.({
        type: "ROW_EXPAND",
        payload: { rowId: row.id, expanded: newExpanded },
      });

      return true;
    },
    [canExpand, isExpanded, row, onEvent]
  );

  const toggleSelected = useCallback(
    (selected?: boolean) => {
      if (!canSelect) return false;

      const newSelected = selected ?? !isSelected;
      row.toggleSelected(newSelected);

      onEvent?.({
        type: "ROW_SELECT",
        payload: { rowId: row.id, selected: newSelected },
      });

      return true;
    },
    [canSelect, isSelected, row, onEvent]
  );

  const expandAll = useCallback(() => {
    if (!canExpand) return false;

    const expandRecursively = (currentRow: Row<T>) => {
      currentRow.toggleExpanded(true);
      if (currentRow.subRows) {
        currentRow.subRows.forEach(expandRecursively);
      }
    };

    expandRecursively(row);

    onEvent?.({
      type: "ROW_EXPAND",
      payload: { rowId: row.id, expanded: true },
    });

    return true;
  }, [canExpand, row, onEvent]);

  const collapseAll = useCallback(() => {
    if (!canExpand) return false;

    const collapseRecursively = (currentRow: Row<T>) => {
      if (currentRow.subRows) {
        currentRow.subRows.forEach(collapseRecursively);
      }
      currentRow.toggleExpanded(false);
    };

    collapseRecursively(row);

    onEvent?.({
      type: "ROW_EXPAND",
      payload: { rowId: row.id, expanded: false },
    });

    return true;
  }, [canExpand, row, onEvent]);

  const getParent = useCallback((): Row<T> | null => {
    if (!row.parentId) return null;
    try {
      return table.getRow(row.parentId);
    } catch {
      return null;
    }
  }, [row.parentId, table]);

  const getChildren = useCallback((): Row<T>[] => {
    return row.subRows || [];
  }, [row.subRows]);

  const getDescendants = useCallback((): Row<T>[] => {
    const descendants: Row<T>[] = [];

    const collectDescendants = (currentRow: Row<T>) => {
      if (currentRow.subRows) {
        currentRow.subRows.forEach((child) => {
          descendants.push(child);
          collectDescendants(child);
        });
      }
    };

    collectDescendants(row);
    return descendants;
  }, [row]);

  const getSiblings = useCallback((): Row<T>[] => {
    const parent = getParent();
    if (!parent) {
      // Root level siblings
      return table
        .getRowModel()
        .rows.filter((r) => !r.parentId && r.id !== row.id);
    }

    return parent.subRows?.filter((r) => r.id !== row.id) || [];
  }, [getParent, table, row]);

  const getIndex = useCallback((): number => {
    return row.index;
  }, [row.index]);

  const moveToIndex = useCallback(
    (newIndex: number): boolean => {
      // This would need to be implemented with actual data manipulation
      // For now, just emit an event
      onEvent?.({
        type: "ROW_REORDER",
        payload: { fromId: row.id, toId: String(newIndex) },
      });

      return true;
    },
    [row.id, onEvent]
  );

  const duplicate = useCallback((): boolean => {
    const rowData = row.original;

    onEvent?.({
      type: "ROW_ADD",
      payload: { row: { ...rowData }, index: row.index + 1 },
    });

    return true;
  }, [row.original, row.index, onEvent]);

  const remove = useCallback((): boolean => {
    onEvent?.({
      type: "ROW_REMOVE",
      payload: { rowId: row.id },
    });

    return true;
  }, [row.id, onEvent]);

  const updateData = useCallback(
    (data: Partial<T>): boolean => {
      // Emit cell edit events for each changed field
      Object.entries(data).forEach(([key, value]) => {
        onEvent?.({
          type: "CELL_EDIT",
          payload: {
            rowId: row.id,
            columnId: key,
            value,
            oldValue: (row.original as any)[key],
          },
        });
      });

      return true;
    },
    [row.id, row.original, onEvent]
  );

  return {
    // State
    canExpand,
    isExpanded,
    canSelect,
    isSelected,
    isGrouped,
    depth,
    subRowsCount,

    // Actions
    toggleExpanded,
    toggleSelected,
    expandAll,
    collapseAll,
    moveToIndex,
    duplicate,
    remove,
    updateData,

    // Navigation
    getParent,
    getChildren,
    getDescendants,
    getSiblings,
    getIndex,

    // Metadata
    id: row.id,
    originalData: row.original,
  };
}
