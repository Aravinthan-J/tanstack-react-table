import { useCallback, useEffect, useState } from "react";
import type { Table } from "@tanstack/react-table";
import type { TableEvent } from "./Table.types";

export function useTableCore(
  table: Table<any>,
  onEventUpdate?: (event: TableEvent) => void
) {
  const [history, setHistory] = useState<TableEvent[]>([]);

  const dispatchEvent = useCallback(
    (event: TableEvent) => {
      setHistory((prev) => [...prev, event]);
      onEventUpdate?.(event);
    },
    [onEventUpdate]
  );

  // Return core table utilities
  return {
    table,
    dispatchEvent,
    history,
  };
}
