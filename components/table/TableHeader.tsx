import type React from "react";
import { useCallback, useMemo, useRef, useState } from "react";
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
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";
import {
  SortableContext,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { type Column, type Header, flexRender } from "@tanstack/react-table";

import { useTable } from "./TableProvider";
import { UPDATED_EVENTS } from "./utils/events";

export function TableHeader() {
  const { table, tableRef } = useTable();
  const { columnOrder } = table.getState();

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (active && over && active.id !== over.id) {
        const fromId = active.id as string;
        const toId = over.id as string;

        tableRef.onColumnDrag(fromId, toId);
        tableRef.updateTableData({
          type: UPDATED_EVENTS.COLUMN_DRAG,
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

  return (
    <thead className="table-header grid sticky top-0 z-10 bg-background">
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="header-row flex w-full">
            <SortableContext
              items={columnOrder}
              strategy={horizontalListSortingStrategy}
            >
              {headerGroup.headers.map((header) => (
                <DraggableTableHeader key={header.id} header={header} />
              ))}
            </SortableContext>
          </tr>
        ))}
      </DndContext>
    </thead>
  );
}

interface DraggableTableHeaderProps {
  header: Header<any, unknown>;
}

function DraggableTableHeader({ header }: DraggableTableHeaderProps) {
  const { tableRef } = useTable();
  const [showMenu, setShowMenu] = useState(false);

  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const isPinned = header.column.getIsPinned();
  const isLastLeftPinned =
    isPinned === "left" && header.column.getIsLastColumn("left");

  const headerStyle: React.CSSProperties = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      left:
        isPinned === "left" ? `${header.column.getStart("left")}px` : undefined,
      right:
        isPinned === "right"
          ? `${header.column.getAfter("right")}px`
          : undefined,
      width: header.getSize(),
      minWidth: header.column.columnDef.minSize,
      maxWidth: header.column.columnDef.maxSize,
    }),
    [transform, isPinned, header.column, header.getSize()],
  );

  const canDrag =
    header.column.id !== "select" &&
    header.column.columnDef.meta?.enableOrdering !== false;

  return (
    <th
      ref={setNodeRef}
      className={`table-header-cell group group flex h-11 items-center justify-between p-3 select-none 
        border-b border-r bg-muted 
        ${isDragging ? "opacity-80 z-20" : ""}
        ${isPinned ? "sticky z-10" : ""}
        ${isLastLeftPinned ? "shadow-inner" : ""}
        ${canDrag ? "cursor-grab" : "cursor-default"}`}
      style={headerStyle}
      colSpan={header.colSpan}
      {...(canDrag ? { ...attributes, ...listeners } : {})}
    >
      <div className="header-content flex items-center justify-between w-full min-w-0">
        <div className="header-title flex items-center min-w-0 flex-1">
          {flexRender(header.column.columnDef.header, header.getContext())}

          {header.column.getCanSort() && (
            <span className="ml-1">
              {header.column.getIsSorted() === "asc" && (
                <svg
                  className="w-3 h-3 text-primary"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M6 3l3 3H3l3-3z" />
                </svg>
              )}
              {header.column.getIsSorted() === "desc" && (
                <svg
                  className="w-3 h-3 text-primary"
                  fill="currentColor"
                  viewBox="0 0 12 12"
                >
                  <path d="M6 9L3 6h6l-3 3z" />
                </svg>
              )}
              {!header.column.getIsSorted() && (
                <span className="w-3 h-3 opacity-30">
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 12 12"
                  >
                    <path d="M6 3l3 3H3l3-3zM6 9L3 6h6l-3 3z" />
                  </svg>
                </span>
              )}
            </span>
          )}
        </div>

        {header.column.columnDef.meta?.headerOptions && (
          <HeaderMenu
            options={header.column.columnDef.meta.headerOptions}
            onOpenChange={setShowMenu}
            open={showMenu}
          />
        )}
      </div>

      {header.column.getCanResize() && (
        <div
          className="resize-handle absolute top-0 right-0 h-full w-1 cursor-col-resize bg-transparent rounded-sm"
          // onDoubleClick={handleDoubleClick}
          onMouseDown={header.getResizeHandler()}
          // onMouseUp={handleResizeEnd}
          onTouchStart={header.getResizeHandler()}
        />
      )}
    </th>
  );
}

interface HeaderMenuProps {
  options: Array<{
    id: string;
    value: string;
    onClick: () => void;
  }>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function HeaderMenu({ options, open, onOpenChange }: HeaderMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <div className="header-menu relative">
      <button
        onClick={() => onOpenChange(!open)}
        className="p-0.5 rounded-sm transition-opacity group-hover:opacity-100"
        style={{ opacity: open ? 1 : 0 }}
      >
        ⋮
      </button>

      {open && (
        <div
          ref={menuRef}
          className="menu-content absolute top-full right-0 z-50 min-w-[120px] bg-background border rounded-md shadow-lg"
        >
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                option.onClick();
                onOpenChange(false);
              }}
              className="w-full px-3 py-2 text-left text-sm hover:bg-muted"
            >
              {option.value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
