import type { Row, RowModel } from "@tanstack/react-table";

/**
 * Utilities for working with table rows
 */

export function flattenRows<T>(rows: Row<T>[]): Row<T>[] {
  const flattened: Row<T>[] = [];

  function processRow(row: Row<T>) {
    flattened.push(row);
    if (row.subRows && row.getIsExpanded()) {
      row.subRows.forEach(processRow);
    }
  }

  rows.forEach(processRow);
  return flattened;
}

export function getRowDepth<T>(row: Row<T>): number {
  return row.depth;
}

export function getRowAncestors<T>(
  row: Row<T>,
  rowModel: RowModel<T>
): Row<T>[] {
  const ancestors: Row<T>[] = [];
  let current = row;

  while (current.parentId) {
    try {
      const parent = rowModel.flatRows.find((r) => r.id === current.parentId);
      if (parent) {
        ancestors.unshift(parent);
        current = parent;
      } else {
        break;
      }
    } catch {
      break;
    }
  }

  return ancestors;
}

export function getRowDescendants<T>(row: Row<T>): Row<T>[] {
  const descendants: Row<T>[] = [];

  function collectDescendants(currentRow: Row<T>) {
    if (currentRow.subRows) {
      currentRow.subRows.forEach((child) => {
        descendants.push(child);
        collectDescendants(child);
      });
    }
  }

  collectDescendants(row);
  return descendants;
}

export function isRowAncestorOf<T>(
  ancestor: Row<T>,
  descendant: Row<T>
): boolean {
  let current = descendant;

  while (current.parentId) {
    if (current.parentId === ancestor.id) {
      return true;
    }
    // Move up the hierarchy (this would need access to the full row model)
    break;
  }

  return false;
}

export function canRowBeMovedTo<T>(
  sourceRow: Row<T>,
  targetParentId: string | null,
  maxDepth = 10
): boolean {
  // Can't move to self
  if (sourceRow.id === targetParentId) {
    return false;
  }

  // Can't move to own descendant
  const descendants = getRowDescendants(sourceRow);
  if (targetParentId && descendants.some((d) => d.id === targetParentId)) {
    return false;
  }

  // Check depth limit
  if (targetParentId) {
    // Would need to calculate new depth
    // This is a simplified check
    const currentDepth = getRowDepth(sourceRow);
    if (currentDepth >= maxDepth - 1) {
      return false;
    }
  }

  return true;
}

export function getVisibleRowsInRange<T>(
  rows: Row<T>[],
  startIndex: number,
  endIndex: number
): Row<T>[] {
  return rows.slice(startIndex, endIndex + 1);
}

export function findRowById<T>(rows: Row<T>[], id: string): Row<T> | null {
  for (const row of rows) {
    if (row.id === id) {
      return row;
    }
    if (row.subRows) {
      const found = findRowById(row.subRows, id);
      if (found) {
        return found;
      }
    }
  }
  return null;
}

export function getRowPath<T>(row: Row<T>, rowModel: RowModel<T>): string[] {
  const path: string[] = [];
  const ancestors = getRowAncestors(row, rowModel);

  ancestors.forEach((ancestor) => path.push(ancestor.id));
  path.push(row.id);

  return path;
}

export function groupRowsByField<T>(
  rows: Row<T>[],
  fieldName: string
): Map<any, Row<T>[]> {
  const groups = new Map<any, Row<T>[]>();

  rows.forEach((row) => {
    const value = (row.original as any)[fieldName];
    if (!groups.has(value)) {
      groups.set(value, []);
    }
    groups.get(value)!.push(row);
  });

  return groups;
}

export function sortRowsByField<T>(
  rows: Row<T>[],
  fieldName: string,
  direction: "asc" | "desc" = "asc"
): Row<T>[] {
  return [...rows].sort((a, b) => {
    const aVal = (a.original as any)[fieldName];
    const bVal = (b.original as any)[fieldName];

    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });
}

export function filterRowsByValue<T>(
  rows: Row<T>[],
  fieldName: string,
  filterValue: any
): Row<T>[] {
  return rows.filter((row) => {
    const value = (row.original as any)[fieldName];
    if (typeof filterValue === "string") {
      return String(value).toLowerCase().includes(filterValue.toLowerCase());
    }
    return value === filterValue;
  });
}
