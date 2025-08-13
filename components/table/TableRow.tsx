import React, { useCallback, useMemo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type Row, flexRender } from "@tanstack/react-table";
import type { VirtualItem, Virtualizer } from "@tanstack/react-virtual";

import { TableCell } from "./TableCell";
import { useTable } from "./TableProvider";
import { EXPANDABLE_TYPES } from "./utils/events";

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

  const rowStyle = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
      top: `${virtualRow.start}px`,
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
      className={`
        table-row flex min-w-full border-b border-border bg-background
        hover:bg-muted/50 transition-colors duration-150
        ${isDragging ? "opacity-50 shadow-lg z-50" : ""}
        ${row.getIsSelected() ? "bg-accent" : ""}
        ${expandEntireRowByClick ? "cursor-pointer" : ""}
      `}
      style={rowStyle}
      onClick={handleRowClick}
      {...attributes}
      {...listeners}
    >
      {row.parentId &&
      expandableType === EXPANDABLE_TYPES.ROW &&
      expandedRowRender ? (
        <td className="w-full flex">{expandedRowRender(row)}</td>
      ) : (
        <>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} cell={cell} />
          ))}
          {isAccordionExpanded && expandedRowRender && (
            <td colSpan={row.getVisibleCells().length} className="w-full p-3">
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

  const rowStyle = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      transition,
    }),
    [transform, transition],
  );

  return (
    <tr
      ref={setNodeRef}
      className={`
        table-row flex min-w-full border-b border-border bg-background
        hover:bg-muted/50 transition-colors duration-150
        ${isDragging ? "opacity-50 shadow-lg z-50" : ""}
        ${row.getIsSelected() ? "bg-accent" : ""}
        ${expandEntireRowByClick ? "cursor-pointer" : ""}
      `}
      style={rowStyle}
      onClick={handleRowClick}
      {...attributes}
      {...listeners}
    >
      {row.parentId &&
      expandableType === EXPANDABLE_TYPES.ROW &&
      expandedRowRender ? (
        <td className="w-full flex">{expandedRowRender(row)}</td>
      ) : (
        <>
          {row.getVisibleCells().map((cell) => (
            <TableCell key={cell.id} cell={cell} />
          ))}
          {isAccordionExpanded && expandedRowRender && (
            <td colSpan={row.getVisibleCells().length} className="w-full p-3">
              {expandedRowRender(row)}
            </td>
          )}
        </>
      )}
    </tr>
  );
}
