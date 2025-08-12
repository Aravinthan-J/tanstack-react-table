import type { Table } from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import type React from "react";
import { useMemo } from "react";

export function useVirtualization(
  table: Table<any>,
  enabled: boolean,
  rowHeight: number,
  containerRef: React.RefObject<HTMLDivElement>,
) {
  const rows = table.getRowModel().rows;

  const rowVirtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => containerRef.current,
    estimateSize: () => rowHeight,
    overscan: 5,
    enabled,
  });

  const virtualRows = useMemo(
    () => (enabled ? rowVirtualizer.getVirtualItems() : []),
    [enabled, rowVirtualizer],
  );

  return {
    rowVirtualizer,
    virtualRows,
    totalSize: rowVirtualizer.getTotalSize(),
  };
}
