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
    <thead
      className="table-header"
      style={{
        display: "grid",
        position: "sticky",
        top: 0,
        zIndex: 1,
        backgroundColor: "hsl(var(--background))",
      }}
    >
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <tr
            key={headerGroup.id}
            className="header-row"
            style={{
              display: "flex",
              width: "100%",
            }}
          >
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

  const style = useMemo(
    () => ({
      transform: CSS.Transform.toString(transform),
      opacity: isDragging ? 0.8 : 1,
      zIndex: isDragging ? 999 : isPinned ? 10 : 1,
      position: isPinned ? "sticky" : "relative",
      left:
        isPinned === "left" ? `${header.column.getStart("left")}px` : undefined,
      right:
        isPinned === "right"
          ? `${header.column.getAfter("right")}px`
          : undefined,
      boxShadow: isLastLeftPinned
        ? "inset -4px 0 4px -4px rgba(0, 0, 0, 0.1)"
        : undefined,
    }),
    [transform, isDragging, isPinned, isLastLeftPinned, header.column],
  );

  const handleDoubleClick = useCallback(() => {
    header.column.resetSize();
    tableRef.updateTableData({
      type: UPDATED_EVENTS.COLUMN_RESIZE,
      value: {
        columnId: header.column.id,
        width: header.column.columnDef.size,
      },
    });
  }, [header, tableRef]);

  const handleResizeEnd = useCallback(() => {
    setTimeout(() => {
      const newWidth = header.getSize();
      tableRef.updateTableData({
        type: UPDATED_EVENTS.COLUMN_RESIZE,
        value: {
          columnId: header.column.id,
          width: newWidth,
        },
      });
    }, 50);
  }, [header, tableRef]);

  const canDrag =
    header.column.id !== "select" &&
    header.column.columnDef.meta?.enableOrdering !== false;

  return (
    <th
      ref={setNodeRef}
      className="table-header-cell group"
      style={
        {
          ...style,
          width: header.getSize(),
          minWidth: header.column.columnDef.minSize,
          maxWidth: header.column.columnDef.maxSize,
          height: "44px",
          display: "flex",
          alignItems: "center",
          padding: "8px 12px",
          backgroundColor: "hsl(var(--muted))",
          borderBottom: "1px solid hsl(var(--border))",
          borderRight: "1px solid hsl(var(--border))",
          cursor: canDrag ? "grab" : "default",
          userSelect: "none",
        } as React.CSSProperties
      }
      colSpan={header.colSpan}
      {...(canDrag ? { ...attributes, ...listeners } : {})}
    >
      <div
        className="header-content"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          minWidth: 0,
        }}
      >
        <div
          className="header-title"
          style={{
            display: "flex",
            alignItems: "center",
            minWidth: 0,
            flex: 1,
          }}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}

          {header.column.getIsSorted() && (
            <span style={{ marginLeft: "4px" }}>
              {header.column.getIsSorted() === "desc" ? " ↓" : " ↑"}
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
          className="resize-handle"
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            height: "100%",
            width: "4px",
            cursor: "col-resize",
            backgroundColor: "transparent",
            borderRadius: "2px",
          }}
          onDoubleClick={handleDoubleClick}
          onMouseDown={header.getResizeHandler()}
          onMouseUp={handleResizeEnd}
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
    <div className="header-menu" style={{ position: "relative" }}>
      <button
        onClick={() => onOpenChange(!open)}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: "2px",
          borderRadius: "2px",
          opacity: open ? 1 : 0,
          transition: "opacity 0.2s",
        }}
        className="group-hover:opacity-100"
      >
        ⋮
      </button>

      {open && (
        <div
          ref={menuRef}
          className="menu-content"
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            backgroundColor: "hsl(var(--background))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "6px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            minWidth: "120px",
          }}
        >
          {options.map((option) => (
            <button
              key={option.id}
              onClick={() => {
                option.onClick();
                onOpenChange(false);
              }}
              style={{
                width: "100%",
                padding: "8px 12px",
                background: "none",
                border: "none",
                textAlign: "left",
                cursor: "pointer",
                fontSize: "14px",
              }}
              className="hover:bg-muted"
            >
              {option.value}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
