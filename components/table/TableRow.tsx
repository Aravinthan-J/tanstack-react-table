import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type Row, flexRender } from "@tanstack/react-table";
import type { VirtualItem, Virtualizer } from "@tanstack/react-virtual";
import React, { useCallback, useMemo } from "react";

import { useTable } from "../TableProvider";
import { EXPANDABLE_TYPES } from "../utils/events";
import { TableCell } from "./TableCell";

interface VirtualizedRowProps {
  row: Row<any>;
  virtualRow: VirtualItem;
  rowVirtualizer: Virtualizer<HTMLDivElement, HTMLTableRowElement>;
}

export function VirtualizedRow({
  row,
  virtualRow,
  rowVirtualizer,
}: VirtualizedRowProps) {
  const { expandable, rowHeight } = useTable();
  const {
    type: expandableType,
    expandEntireRowByClick,
    expandedRowRender,
  } = expandable;

  const {
    transform,
    transition,
    setNodeRef,
    isDragging,
    attributes,
    listeners,
  } = useSortable({ id: row.id });

  const handleRowClick = useCallback(() => {
    if (expandEntireRowByClick && row.getCanExpand()) {
      row.toggleExpanded();
    }
  }, [expandEntireRowByClick, row]);

  const isAccordionExpanded =
    expandableType === EXPANDABLE_TYPES.ACCORDION && row.getIsExpanded();

  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.8 : 1,
      zIndex: isDragging ? 1 : 0,
      position: "absolute" as const,
      top: `${virtualRow.start}px`,
      width: "100%",
      height: isAccordionExpanded ? "auto" : `${rowHeight}px`,
    }),
    [
      transform,
      transition,
      isDragging,
      virtualRow.start,
      rowHeight,
      isAccordionExpanded,
    ],
  );

  return (
    <tr
      ref={(node) => {
        setNodeRef(node);
        rowVirtualizer.measureElement(node);
      }}
      data-index={virtualRow.index}
      className={`table-row ${row.getIsSelected() ? "selected" : ""}`}
      style={{
        ...style,
        display: "flex",
        backgroundColor: row.getIsSelected()
          ? "hsl(var(--accent))"
          : "hsl(var(--background))",
        cursor: expandEntireRowByClick ? "pointer" : "default",
      }}
      onClick={handleRowClick}
      {...attributes}
      {...listeners}
    >
      {row.parentId &&
      expandableType === EXPANDABLE_TYPES.ROW &&
      expandedRowRender ? (
        <td style={{ width: "100%", display: "flex" }}>
          {expandedRowRender(row)}
        </td>
      ) : (
        <>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} cell={cell} />
          ))}
          {isAccordionExpanded && expandedRowRender && (
            <td
              colSpan={row.getVisibleCells().length}
              style={{ width: "100%", padding: "12px" }}
            >
              {expandedRowRender(row)}
            </td>
          )}
        </>
      )}
    </tr>
  );
}

interface NormalRowProps {
  row: Row<any>;
}

export function NormalRow({ row }: NormalRowProps) {
  const { expandable } = useTable();
  const {
    type: expandableType,
    expandEntireRowByClick,
    expandedRowRender,
  } = expandable;

  const {
    transform,
    transition,
    setNodeRef,
    isDragging,
    attributes,
    listeners,
  } = useSortable({ id: row.id });

  const handleRowClick = useCallback(() => {
    if (expandEntireRowByClick && row.getCanExpand()) {
      row.toggleExpanded();
    }
  }, [expandEntireRowByClick, row]);

  const isAccordionExpanded =
    expandableType === EXPANDABLE_TYPES.ACCORDION && row.getIsExpanded();

  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
      opacity: isDragging ? 0.8 : 1,
      zIndex: isDragging ? 1 : 0,
    }),
    [transform, transition, isDragging],
  );

  return (
    <tr
      ref={setNodeRef}
      className={`table-row ${row.getIsSelected() ? "selected" : ""}`}
      style={{
        ...style,
        display: "flex",
        width: "100%",
        backgroundColor: row.getIsSelected()
          ? "hsl(var(--accent))"
          : "hsl(var(--background))",
        cursor: expandEntireRowByClick ? "pointer" : "default",
        borderBottom: "1px solid hsl(var(--border))",
      }}
      onClick={handleRowClick}
      {...attributes}
      {...listeners}
    >
      {row.parentId &&
      expandableType === EXPANDABLE_TYPES.ROW &&
      expandedRowRender ? (
        <td style={{ width: "100%", display: "flex" }}>
          {expandedRowRender(row)}
        </td>
      ) : (
        <>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} cell={cell} />
          ))}
          {isAccordionExpanded && expandedRowRender && (
            <td
              colSpan={row.getVisibleCells().length}
              style={{ width: "100%", padding: "12px" }}
            >
              {expandedRowRender(row)}
            </td>
          )}
        </>
      )}
    </tr>
  );
}
