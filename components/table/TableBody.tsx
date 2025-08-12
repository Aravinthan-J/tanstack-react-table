import {
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { Virtualizer } from "@tanstack/react-virtual";
import React, { useCallback, useMemo } from "react";

import { useTable } from "./TableProvider";
import { UPDATED_EVENTS } from "./utils/events";
import { NormalRow, VirtualizedRow } from "./TableRow";

interface TableBodyProps {
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
  isVirtual: boolean;
}

export function TableBody({ rowVirtualizer, isVirtual }: TableBodyProps) {
  const { table, tableRef } = useTable();
  const rows = table.getRowModel().rows;

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (active && over && active.id !== over.id) {
        const fromId = active.id as string;
        const toId = over.id as string;

        tableRef.onRowDrag(fromId, toId);
        tableRef.updateTableData({
          type: UPDATED_EVENTS.ROW_DRAG,
          value: { fromId, toId },
        });
      }
    },
    [tableRef],
  );

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor),
  );

  const dataIds = useMemo(() => rows.map((row) => row.id), [rows]);

  if (!isVirtual) {
    return (
      <tbody className="table-body">
        <DndContext
          collisionDetection={closestCenter}
          modifiers={[restrictToVerticalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <SortableContext
            items={dataIds}
            strategy={verticalListSortingStrategy}
          >
            {rows.map((row) => (
              <NormalRow key={row.id} row={row} />
            ))}
          </SortableContext>
        </DndContext>
      </tbody>
    );
  }

  return (
    <tbody
      className="table-body virtualized"
      style={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        position: "relative",
      }}
    >
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const row = rows[virtualRow.index];
            if (!row) return null;

            return (
              <VirtualizedRow
                key={row.id}
                row={row}
                virtualRow={virtualRow}
                rowVirtualizer={rowVirtualizer}
              />
            );
          })}
        </SortableContext>
      </DndContext>
    </tbody>
  );
}
