import React, {
  Fragment,
  type ReactNode,
  useMemo,
  type CSSProperties,
  useCallback,
} from "react";
import { type Cell, flexRender, type Row } from "@tanstack/react-table";
import type { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import {
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  type DragEndEvent,
  DndContext,
  closestCenter,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { EXPANDABLE_TYPES, UPDATED_EVENTS } from "../constant";
import { useTable } from "./tablecontext";
import { tableRowVariants, tableCellVariants } from "../variants/table";
import { cn } from "../utils/cn";

interface TableBodyRowProps {
  row: Row<object>;
  virtualRow: VirtualItem;
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
}

const ExpandedContent = ({
  row,
  expandedRowRender,
}: {
  row: Row<object>;
  expandedRowRender?: ((row: Row<object>) => React.ReactNode) | null;
}) => {
  return (
    <td colSpan={row.getVisibleCells().length} className="w-full tableCell">
      {expandedRowRender?.(row)}
    </td>
  );
};

export const TableBodyRow = React.memo(function TableBodyRowMemo({
  row,
  virtualRow,
  rowVirtualizer,
}: TableBodyRowProps) {
  const {
    expandable,
    rowHeight,
    striped,
    bordered,
    compact,
    hoverable,
    density,
    classNames,
  } = useTable();
  const {
    type: expandableType,
    expandEntireRowByClick,
    expandedRowRender,
  } = expandable;

  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.id,
  });

  const isAccordionExpandable =
    expandableType === EXPANDABLE_TYPES.ACCORDION && row.getIsExpanded();

  const handleRowClick = useCallback(() => {
    if (expandEntireRowByClick && row.getCanExpand()) row.toggleExpanded();
  }, [expandEntireRowByClick, row]);

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    top: `${virtualRow.start}px`,
  };

  if (isAccordionExpandable) {
    style.flexWrap = "wrap";
  } else {
    style.height = `${rowHeight}px`;
  }

  const isLastSubRow = row.getParentRow()?.subRows?.length === row.index + 1;

  return (
    <Fragment key={row.id}>
      <tr
        data-index={virtualRow.index}
        ref={(node) => {
          setNodeRef(node);
          rowVirtualizer.measureElement(node);
        }}
        style={style}
        className={cn(
          tableRowVariants({
            striped,
            bordered,
            compact,
            hoverable,
            density,
            class: row.getIsSelected() ? "bg-primary-25" : "bg-white",
          }),
          classNames?.row
        )}
        onClick={handleRowClick}
        onKeyDown={handleRowClick}
      >
        {row.parentId &&
        expandableType === EXPANDABLE_TYPES.ROW &&
        expandedRowRender ? (
          expandedRowRender(row)
        ) : (
          <>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} cell={cell} />
            ))}
          </>
        )}
        {isAccordionExpandable && (
          <ExpandedContent row={row} expandedRowRender={expandedRowRender} />
        )}
      </tr>
    </Fragment>
  );
});

export function NormalRowRender({ row }: { row: Row<object> }) {
  const {
    expandable,
    striped,
    bordered,
    compact,
    hoverable,
    density,
    classNames,
  } = useTable();
  const {
    type: expandableType,
    expandEntireRowByClick,
    expandedRowRender,
  } = expandable;

  const handleRowClick = useCallback(() => {
    if (expandEntireRowByClick && row.getCanExpand()) row.toggleExpanded();
  }, [expandEntireRowByClick, row]);

  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.id,
  });

  const isAccordionExpandable =
    expandableType === EXPANDABLE_TYPES.ACCORDION && row.getIsExpanded();

  const isLastSubRow = row.getParentRow()?.subRows?.length === row.index + 1;

  const style: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <Fragment key={row.id}>
      <tr
        ref={setNodeRef}
        style={style}
        className={cn(
          tableRowVariants({
            striped,
            bordered,
            compact,
            hoverable,
            density,
            class: row.getIsSelected() ? "bg-primary-25" : "bg-white",
          }),
          classNames?.row
        )}
        onClick={handleRowClick}
        onKeyDown={handleRowClick}
      >
        {row.parentId &&
        expandableType === EXPANDABLE_TYPES.ROW &&
        expandedRowRender ? (
          expandedRowRender(row)
        ) : (
          <>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} cell={cell} />
            ))}
          </>
        )}
        {isAccordionExpandable && (
          <ExpandedContent row={row} expandedRowRender={expandedRowRender} />
        )}
      </tr>
    </Fragment>
  );
}

function TableCell({ cell }: { cell: Cell<object, unknown> }) {
  const { column } = cell;
  const { rowHeight, bordered, density, classNames } = useTable();

  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");

  const style: CSSProperties = {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px inset #b4b5b5"
      : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    position: isPinned ? "sticky" : undefined,
    transition: "width transform 0.2s ease-in-out",
    zIndex: isPinned ? 10 : undefined,
    minWidth: `${column.columnDef.minSize || 0}px`,
    minHeight: `${rowHeight}px`,
  };

  return (
    <td
      key={cell.id}
      style={{ width: column.getSize(), ...style }}
      className={cn(tableCellVariants({ bordered, density }), classNames?.cell)}
    >
      {flexRender(column.columnDef.cell, cell.getContext())}
    </td>
  );
}

interface RowReorderProps {
  children: ReactNode;
}

export function DraggableRow({ children }: RowReorderProps) {
  const { table, tableRef } = useTable();
  const { rows } = table.getRowModel();

  const dataIds = useMemo(() => rows?.map(({ id }) => id), [rows]);

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event as {
        active: { id: string };
        over: { id: string };
      };
      if (active && over && active.id !== over.id) {
        tableRef.onRowDrag(active.id, over.id);
        tableRef.updateTableData?.({
          type: UPDATED_EVENTS.ROW_DRAG,
          value: {
            fromId: active.id,
            toId: over.id,
          },
        });
      }
    },
    [tableRef]
  );

  return (
    <DndContext
      collisionDetection={closestCenter}
      modifiers={[restrictToVerticalAxis]}
      onDragEnd={handleDragEnd}
      sensors={sensors}
      autoScroll={{
        acceleration: 20,
        enabled: true,
        threshold: { x: 0.3, y: 0.3 },
      }}
    >
      <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  );
}

export const RowDragHandleCell = ({ rowId }: { rowId: string }) => {
  const { attributes, listeners } = useSortable({ id: rowId });

  return (
    <div
      {...attributes}
      {...listeners}
      data-rowid={rowId}
      className={
        "cursor-grab flex justify-center opacity-0 -left-10 items-center absolute group-hover/tablerow:opacity-100 transition-opacity duration-200"
      }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-grip-vertical"
      >
        <circle cx="9" cy="12" r="1" />
        <circle cx="15" cy="12" r="1" />
        <path d="M9 6h.01" />
        <path d="M15 6h.01" />
        <path d="M9 18h.01" />
        <path d="M15 18h.01" />
      </svg>
    </div>
  );
};
