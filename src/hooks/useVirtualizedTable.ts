import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef } from "react";
import { useTable } from "../components/tablecontext";

export const useVirtualizedTable = () => {
  const { table, rowHeight } = useTable();
  const tableContainerRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    count: table.getRowModel().rows.length,
    estimateSize: () => rowHeight,
    getScrollElement: () => tableContainerRef.current,
    measureElement:
      typeof window !== "undefined" &&
      navigator.userAgent.indexOf("Firefox") === -1
        ? (element) => element?.getBoundingClientRect().height
        : undefined,
    overscan: 10,
    enabled: true,
  });

  return { rowVirtualizer, tableContainerRef };
};