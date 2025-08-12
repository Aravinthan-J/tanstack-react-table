import type { Table } from "@tanstack/react-table";
import { useCallback, useState } from "react";
import type { DnDOptions } from "./Table.types";

/**
 * Drag and Drop functionality hook
 * Manages row and cell reordering
 */
export function useDnD(table: Table<any>, options: DnDOptions) {
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [dragOverItem, setDragOverItem] = useState<string | null>(null);

  const handleDragStart = useCallback(
    (itemId: string, type: "row" | "column") => {
      if (!options.enabled) return;

      if (type === "row" && !options.rowReorder) return;
      if (type === "column" && !options.cellReorder) return;

      setDraggedItem(itemId);
    },
    [options],
  );

  const handleDragOver = useCallback(
    (itemId: string) => {
      if (!options.enabled || !draggedItem) return;
      setDragOverItem(itemId);
    },
    [options, draggedItem],
  );

  const handleDrop = useCallback(
    (targetId: string, type: "row" | "column") => {
      if (!options.enabled || !draggedItem) return;

      // Perform the reorder operation
      if (type === "row" && options.rowReorder) {
        // Row reorder logic
        console.log(`Reordering row ${draggedItem} to position of ${targetId}`);
      } else if (type === "column" && options.cellReorder) {
        // Column reorder logic
        console.log(
          `Reordering column ${draggedItem} to position of ${targetId}`,
        );
      }

      // Reset drag state
      setDraggedItem(null);
      setDragOverItem(null);
    },
    [options, draggedItem],
  );

  const handleDragEnd = useCallback(() => {
    setDraggedItem(null);
    setDragOverItem(null);
  }, []);

  return {
    draggedItem,
    dragOverItem,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  };
}
